/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'react-native-web',
    'tamagui',
    '@tamagui/core',
    '@tamagui/config',
    'react-native-svg',
  ],
}

module.exports = nextConfig
