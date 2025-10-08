# Expo TODO Starter

A React Native + Expo (TypeScript) TODO application starter template. This project provides a complete, production-ready TODO app with CRUD operations, local persistence, and native mobile support for both iOS and Android.

## Features

- ✅ **React Native + Expo Managed Workflow** - Cross-platform development with hot reload
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **React Navigation** - Native stack navigation between screens
- ✅ **AsyncStorage** - Local data persistence across app sessions
- ✅ **CRUD Operations** - Create, Read, Update, Delete TODO items
- ✅ **Modern UI** - Clean, accessible user interface
- ✅ **Unit Tests** - Jest + React Native Testing Library
- ✅ **Code Quality** - ESLint + Prettier + TypeScript checks
- ✅ **CI/CD Ready** - GitHub Actions workflow included
- ✅ **Accessibility** - Screen reader support and accessibility labels

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TodoItem.tsx    # Individual TODO list item
│   └── TodoForm.tsx    # Create/edit TODO form
├── hooks/              # Custom React hooks
│   └── useTodos.ts     # TODO CRUD operations hook
├── models/             # TypeScript type definitions
│   └── todo.ts         # TODO interfaces and types
├── navigation/         # React Navigation setup
│   └── index.tsx       # Navigation configuration
├── screens/            # Screen components
│   ├── TodoListScreen.tsx    # Main TODO list view
│   ├── TodoEditScreen.tsx    # Create/edit TODO screen
│   └── TodoDetailScreen.tsx  # TODO details view
├── utils/              # Utility functions
│   └── storage.ts      # AsyncStorage wrapper
└── __tests__/          # Unit tests
    └── useTodos.test.ts # Tests for TODO hook
```

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. Clone this repository:
```bash
git clone https://github.com/tt-hasegawa/ExpoExample.git
cd ExpoExample
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm start
# or for tunnel mode (recommended for remote development):
npm start -- --tunnel
```

4. Open Expo Go on your mobile device and scan the QR code

### Development Scripts

```bash
# Start development server
npm start

# Start with tunnel (for remote development/Codespaces)
npm start -- --tunnel

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check
```

## Using with GitHub Codespaces

This project is optimized for development in GitHub Codespaces:

1. **Open in Codespaces**: Click the green "Code" button → "Codespaces" → "Create codespace on main"

2. **Install dependencies**:
```bash
npm install --legacy-peer-deps
```

3. **Start with tunnel mode**:
```bash
npm start -- --tunnel
```

4. **Access from mobile device**: 
   - The tunnel URL will be displayed in the terminal
   - Open Expo Go on your mobile device
   - Scan the QR code or enter the tunnel URL manually

### Alternative: Using ngrok

If you prefer using ngrok for tunneling:

1. Install ngrok globally:
```bash
npm install -g ngrok
```

2. Start the dev server normally:
```bash
npm start
```

3. In another terminal, tunnel the Expo dev server:
```bash
ngrok http 19000
```

4. Use the ngrok HTTPS URL in Expo Go

## Testing

This project includes comprehensive unit tests for the core business logic:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

Tests are located in `src/__tests__/` and cover:
- TODO CRUD operations
- AsyncStorage integration
- Error handling
- State management

## Code Quality

The project enforces code quality through:

- **ESLint**: Code linting with React Native and TypeScript rules
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **EditorConfig**: Consistent editor settings

Configuration files:
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier formatting rules
- `.editorconfig` - Editor settings
- `tsconfig.json` - TypeScript configuration

## Continuous Integration

GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:

- Installs dependencies
- Runs TypeScript type checking
- Executes ESLint linting
- Runs the test suite with coverage
- Tests on multiple Node.js versions (18.x, 20.x)

The workflow runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` branch

## Architecture

### Data Flow

1. **Storage Layer**: `storageUtils` handles AsyncStorage operations
2. **Business Logic**: `useTodos` hook manages TODO state and operations
3. **UI Layer**: React components consume the hook for data and actions
4. **Navigation**: React Navigation handles screen transitions

### Key Components

- **useTodos Hook**: Central state management for TODO operations
  - Loads TODOs from AsyncStorage on mount
  - Provides CRUD operations with optimistic updates
  - Handles loading states and error management

- **Storage Utils**: AsyncStorage abstraction layer
  - Serializes/deserializes TODO objects with Date handling
  - Provides error handling for storage operations

- **Components**: Reusable UI components with accessibility support
  - TodoItem: Individual TODO display with actions
  - TodoForm: Create/edit form with validation

## Deployment

### Building for Production

For building production APKs/IPAs, you'll need to set up EAS Build:

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Configure EAS:
```bash
eas init
```

3. Build for Android:
```bash
eas build --platform android
```

4. Build for iOS:
```bash
eas build --platform ios
```

### Web Deployment

To deploy the web version:

```bash
npm run web
# Build output will be in the web-build directory
```

## Customization

### Adding New Features

1. **New TODO Properties**: Update the `Todo` interface in `src/models/todo.ts`
2. **Additional Screens**: Add new screens in `src/screens/` and update navigation
3. **Custom Components**: Create reusable components in `src/components/`
4. **Extended Storage**: Modify `storageUtils` for additional data operations

### Styling

The app uses React Native's StyleSheet API with a clean, modern design:
- Consistent color scheme (`#007AFF` primary, `#f5f5f5` background)
- Accessible touch targets (minimum 48px)
- Responsive layout for different screen sizes

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Dependency conflicts**: Use `npm install --legacy-peer-deps`
3. **Expo Go connection issues**: Ensure both devices are on the same network or use tunnel mode
4. **TypeScript errors**: Run `npm run type-check` to identify issues

### Performance Tips

- Use `useMemo` and `useCallback` for expensive operations
- Implement `FlatList` for large TODO lists
- Consider implementing virtual scrolling for very large datasets

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Navigation by [React Navigation](https://reactnavigation.org/)
- Testing with [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- Icons from system emoji fonts