import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useCreateDeviceMutation, useDeleteDeviceMutation, useGetDevicesQuery, useUpdateDeviceMutation } from '@/services/api'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { useSocket } from '@/hooks/useSocket'

export function DevicesPage() {
  const { data: devices, isError } = useGetDevicesQuery()
  const [createDevice] = useCreateDeviceMutation()
  const [updateDevice] = useUpdateDeviceMutation()
  const [deleteDevice] = useDeleteDeviceMutation()
  const socket = useSocket()

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<any>({ name: '', type: 'switch', state: { on: false } })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (!socket) return
    const handle = () => {
      // cache invalidation handled globally
    }
    socket.on('device:update', handle)
    return () => {
      socket.off('device:update', handle)
    }
  }, [socket])

  const rows = useMemo(() => devices ?? [], [devices])

  const onSave = async () => {
    if (editingId) {
      await updateDevice({ id: editingId, data: form }).unwrap()
    } else {
      await createDevice(form).unwrap()
    }
    setOpen(false)
    setEditingId(null)
    setForm({ name: '', type: 'switch', state: { on: false } })
  }

  const onToggle = async (device: any) => {
    const newState = { ...device.state, on: !device.state?.on }
    await updateDevice({ id: device.id, data: { state: newState } })
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Devices</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Add</Button>
      </Stack>
      {isError && <Alert severity="error">Failed to load devices</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((d: any) => (
            <TableRow key={d.id} hover>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.type}</TableCell>
              <TableCell>
                <Chip label={d.state?.on ? 'On' : 'Off'} color={d.state?.on ? 'success' : 'default'} size="small" />
                <IconButton onClick={() => onToggle(d)} sx={{ ml: 1 }}><PowerSettingsNewIcon /></IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => { setEditingId(d.id); setForm({ name: d.name, type: d.type, state: d.state }); setOpen(true) }}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => deleteDevice(d.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Edit device' : 'Add device'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
            <TextField label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={onSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}