import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack, XStack, Text, Card, Button, Separator } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'
import {
  Ship,
  Truck,
  Package,
  Users,
  TrendingUp,
  Activity,
  Rocket,
  CheckCircle2,
} from 'lucide-react-native'
import {
  SHIPS,
  METRICS,
  CATEGORY_STOCK,
  stockColor,
  type Metric,
} from '../lib/data'

const metricIcons: Record<string, any> = {
  ships: Truck,
  stock: Package,
  pharmacies: Users,
  roi: TrendingUp,
}

export default function Dashboard() {
  const insets = useSafeAreaInsets()
  const [placed, setPlaced] = useState(false)

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0A0A0A' }}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 32,
        paddingHorizontal: 16,
        gap: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap="$2.5">
          <YStack
            width={40}
            height={40}
            borderRadius={12}
            backgroundColor="$primary"
            alignItems="center"
            justifyContent="center"
          >
            <Ship size={20} color="#0A0A0A" />
          </YStack>
          <XStack gap="$1">
            <Text fontSize={20} fontWeight="900" color="$primary">
              PHARMALINK
            </Text>
            <Text fontSize={20} fontWeight="900" color="$accent">
              TZ
            </Text>
          </XStack>
        </XStack>
        <YStack
          width={9}
          height={9}
          borderRadius={9}
          backgroundColor="$primary"
        />
      </XStack>

      {/* ── Hero ── */}
      <Card overflow="hidden" borderRadius="$7" borderWidth={1} borderColor="$borderColor">
        <LinearGradient
          colors={['#10B981', '#0A0A0A', '#00D4FF']}
          start={[0, 0]}
          end={[1, 1]}
          padding="$5"
        >
          <Text color="white" fontSize={26} fontWeight="900" lineHeight={30}>
            Tanzania&apos;s pharmacies.{'\n'}East Africa&apos;s supply chain.
          </Text>
          <Text color="rgba(255,255,255,0.85)" marginTop="$2" fontSize={14}>
            Order stock, track ships, watch live analytics — in real time.
          </Text>
        </LinearGradient>
      </Card>

      {/* ── Metrics ── */}
      <XStack flexWrap="wrap" gap="$3">
        {METRICS.map((m: Metric) => {
          const Icon = metricIcons[m.key]
          const color = m.accent === 'blue' ? '#00D4FF' : '#10B981'
          return (
            <Card
              key={m.key}
              flexBasis="47%"
              flexGrow={1}
              padding="$4"
              borderRadius="$6"
              backgroundColor="$backgroundStrong"
              borderWidth={1}
              borderColor="$borderColor"
            >
              <Icon size={26} color={color} />
              <Text fontSize={24} fontWeight="900" color="white" marginTop="$2">
                {m.value}
              </Text>
              <Text fontSize={12} color="$placeholderColor">
                {m.label}
              </Text>
            </Card>
          )
        })}
      </XStack>

      {/* ── Stock health ── */}
      <Card
        padding="$4"
        borderRadius="$6"
        backgroundColor="$backgroundStrong"
        borderWidth={1}
        borderColor="$borderColor"
        gap="$3"
      >
        <XStack alignItems="center" gap="$2">
          <TrendingUp size={18} color="#10B981" />
          <Text fontSize={16} fontWeight="800" color="white">
            Stock health by category
          </Text>
        </XStack>
        {CATEGORY_STOCK.map((c) => (
          <YStack key={c.name} gap="$1.5">
            <XStack justifyContent="space-between">
              <Text fontSize={13} color="$color">
                {c.name}
              </Text>
              <Text fontSize={13} fontWeight="700" color={stockColor(c.level)}>
                {c.level}%
              </Text>
            </XStack>
            <YStack
              height={8}
              borderRadius={8}
              backgroundColor="$backgroundSoft"
              overflow="hidden"
            >
              <YStack
                height={8}
                borderRadius={8}
                width={`${c.level}%`}
                backgroundColor={stockColor(c.level)}
              />
            </YStack>
          </YStack>
        ))}
      </Card>

      {/* ── Fleet ── */}
      <Card
        padding="$4"
        borderRadius="$6"
        backgroundColor="$backgroundStrong"
        borderWidth={1}
        borderColor="$borderColor"
        gap="$3"
      >
        <XStack alignItems="center" gap="$2">
          <Activity size={18} color="#00D4FF" />
          <Text fontSize={16} fontWeight="800" color="white">
            Live fleet status
          </Text>
        </XStack>
        {SHIPS.map((s, i) => {
          const color = s.status === 'En Route' ? '#00D4FF' : '#10B981'
          return (
            <YStack key={s.id} gap="$2">
              {i > 0 && <Separator borderColor="$borderColor" />}
              <XStack justifyContent="space-between" alignItems="center">
                <YStack>
                  <Text fontSize={14} fontWeight="700" color="white">
                    {s.name}
                  </Text>
                  <Text fontSize={12} color="$placeholderColor">
                    {s.cargo}
                  </Text>
                </YStack>
                <YStack alignItems="flex-end">
                  <Text fontSize={12} fontWeight="800" color={color}>
                    {s.status}
                  </Text>
                  <Text fontSize={11} color="$placeholderColor">
                    ETA {s.eta}
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          )
        })}
      </Card>

      {/* ── Order CTA ── */}
      <Button
        size="$5"
        backgroundColor={placed ? '$accent' : '$primary'}
        color="#0A0A0A"
        fontWeight="900"
        icon={placed ? <CheckCircle2 size={20} /> : <Rocket size={20} />}
        onPress={() => {
          setPlaced(true)
          setTimeout(() => setPlaced(false), 4000)
        }}
      >
        {placed ? 'ORDER PLACED — SHIP IN 47 MIN' : 'ORDER MEDICINE STOCK'}
      </Button>

      <Text textAlign="center" fontSize={12} color="$placeholderColor">
        Built with Expo + Tamagui · shares the web design system
      </Text>
    </ScrollView>
  )
}
