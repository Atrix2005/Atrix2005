import { Box, Card, CardContent, Typography } from '@mui/material'

export function RoutinesPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Routines</Typography>
      <Card>
        <CardContent>
          <Typography color="text.secondary">Coming soon: rule-based automations with triggers and actions.</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}