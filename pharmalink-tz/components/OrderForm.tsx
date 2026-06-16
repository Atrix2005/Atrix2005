'use client'

import { useState } from 'react'
import { YStack, XStack, Input, Text, Button as TButton } from 'tamagui'
import { MEDICINE_TYPES, SUPPLIERS } from '../lib/data'
import { placeOrder } from '../lib/queries'
import { CheckCircle2, Rocket, Loader2 } from 'lucide-react'

const selectStyle: React.CSSProperties = {
  height: 48,
  width: '100%',
  borderRadius: 12,
  background: '#1A1A1A',
  color: '#fff',
  border: '1px solid #222',
  padding: '0 14px',
  fontSize: 15,
  outline: 'none',
}

export default function OrderForm() {
  const [medicine, setMedicine] = useState(MEDICINE_TYPES[0])
  const [supplier, setSupplier] = useState(SUPPLIERS[0])
  const [qty, setQty] = useState('5000')
  const [placed, setPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState('')

  async function submit() {
    if (loading) return
    setLoading(true)
    const result = await placeOrder({
      medicine,
      quantity: Number(qty) || 0,
      supplier,
    })
    setLoading(false)
    setPlaced(true)
    setNote(result.message)
    setTimeout(() => setPlaced(false), 5000)
  }

  return (
    <YStack gap="$4">
      <XStack gap="$4" flexWrap="wrap">
        <YStack flex={1} minWidth={220} gap="$2">
          <Text color="$accent" fontSize={13} fontWeight="700">
            MEDICINE TYPE
          </Text>
          <select
            style={selectStyle}
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          >
            {MEDICINE_TYPES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </YStack>

        <YStack flex={1} minWidth={180} gap="$2">
          <Text color="$accent" fontSize={13} fontWeight="700">
            QUANTITY (BOXES)
          </Text>
          <Input
            size="$4"
            keyboardType="numeric"
            value={qty}
            onChangeText={setQty}
            backgroundColor="$backgroundSoft"
            borderColor="$borderColor"
            color="white"
            placeholder="e.g. 5000"
          />
        </YStack>
      </XStack>

      <YStack gap="$2">
        <Text color="$accent" fontSize={13} fontWeight="700">
          SUPPLIER (EAST AFRICA)
        </Text>
        <select
          style={selectStyle}
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        >
          {SUPPLIERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </YStack>

      <TButton
        size="$5"
        backgroundColor={placed ? '$accent' : '$primary'}
        color="black"
        fontWeight="900"
        hoverStyle={{ scale: 1.02, backgroundColor: '$primaryHover' }}
        pressStyle={{ scale: 0.98 }}
        onPress={submit}
        disabled={loading}
        icon={
          loading ? (
            <Loader2 size={20} />
          ) : placed ? (
            <CheckCircle2 size={20} />
          ) : (
            <Rocket size={20} />
          )
        }
      >
        {loading
          ? 'PLACING ORDER…'
          : placed
            ? 'ORDER PLACED — MV DAR MEDICINE DEPARTS IN 47 MIN'
            : `CONFIRM ORDER: ${qty || 0} BOXES OF ${medicine.toUpperCase()}`}
      </TButton>

      {placed && (
        <XStack
          gap="$2"
          alignItems="center"
          backgroundColor="$backgroundSoft"
          borderRadius="$4"
          padding="$3"
        >
          <CheckCircle2 size={18} color="#10B981" />
          <Text color="$color" fontSize={14}>
            {note || `Confirmed with ${supplier}.`} Live tracking enabled on the
            map above.
          </Text>
        </XStack>
      )}
    </YStack>
  )
}
