# KeyOnTheGo Mobile Application

## What's here?

- [Expo](https://docs.expo.dev/) (Framework for React Native)
- [Tamagui](https://tamagui.dev/ui/intro) (Component Library for React Native)

## Setup and Development

> You don't need Android Studio or JDK unless you are using Android Emulator. For simplicity, we will use [Expo Go](https://expo.dev/go). Install it on your phone.

- Using Linux, MacOS or WSL, install nix package manager

```
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```

- Clone this repo and install all system dependencies (e.g. Language and tooling) with nix (defined in [flake.nix](./flake.nix)). Confirm by checking the version

```
cd mobile-app-keyonthego
nix develop
node --version
```

- Install node dependencies and start the expo server using npm

```
npm install
npm start
```

- Open Expo Go and scan the QR Code. It will hot reload if any changes detected. Restart the expo server if the connection is drop.

## First Time Contribution

Before contributing, please check [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`STYLE_GUIDE.md`](./STYLE_GUIDE.md).

After that, you can try to modify [`app/(tabs)/index.tsx`](./app/(tabs)/index.tsx) to change your home screen.

You can also create a new page in nested folder `/path/to/page.tsx` and use `<Link>` to navigate to the page.

```diff
+ import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
+      <Link href="/details">View details</Link>
    </View>
  );
}
```

Or navigate with data

```tsx
<Link
  href={{
    pathname: '/details/[id]',
    params: { id: 'beef' },
  }}>
  View user details
</Link>
```

After that, you can learn more about these:

- Using Tamagui component
- Learn more in the expo documentation page: [guide](https://docs.expo.dev/guides/overview/) (e.g. Navigation, error handling, native kotlin 3rd party, etc ), [SDK](https://docs.expo.dev/versions/latest/) (e.g. using camera, storage, etc) and [tutorial](https://docs.expo.dev/tutorial/introduction/). Including but not limited to:
  - Create your own component in `components` folder
  - Reusable utility functions
  - Assets management
  - API Call
- Authentication, protected page and saving session
- Using Firebase product feature
- Using expo for deploy to Play store