# **Tech Detox**
A React Native mobile app for digital wellbeing, helping users reduce screen time through goal setting, usage tracking, and mindful notifications.

<p>
   <img src="https://img.shields.io/badge/React_Native-0.72-blue?style=flat-surface" alt="React Native 0.72"/>
</p>
<p>
   <img src="https://img.shields.io/badge/Expo_SDK-49-black?style=flat-surface" alt="Expo SDK 49"/>
</p>
<p>
   <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-surface" alt="TypeScript 5"/>
</p>

## **Problem Statement**

The average person spends 6+ hours daily on their phone. Existing screen-time apps are:
- **Punitive** — Hard locks that users bypass immediately
- **Passive** — They show data but don't drive behavior change
- **Isolated** — No social accountability or milestone celebration
- **Platform-locked** — iOS Screen Time or Android Digital Wellbeing don't cross platforms
  
Tech Detox takes a **positive psychology approach**: setting achievable goals, celebrating progress, and building awareness through gentle nudges rather than harsh restrictions.

## **Tech Stack**

| Layer                | Technology                   | Purpose                                                    |
| -------------------- | ---------------------------- | ---------------------------------------------------------- |
| Framework            | React Native 0.72            | Cross-platform mobile development (iOS + Android)          |
| Development Platform | Expo SDK 49                  | Rapid development, over-the-air updates, native API access |
| Language             | TypeScript 5                 | Type safety and developer experience                       |
| State Management     | React Context + AsyncStorage | Lightweight state persistence across sessions              |
| Navigation           | React Navigation 6           | Stack and tab-based navigation patterns                    |
| UI Components        | React Native Paper           | Material Design components with theming                    |
| Data Visualization   | React Native SVG + D3        | Custom progress rings and usage charts                     |
| Notifications        | Expo Notifications           | Local push notifications for mindful nudges                |
| Storage              | AsyncStorage                 | Persistent local storage for goals and usage history       |

## **Key Features**

- **Smart goal setting** — Users define daily screen-time budgets by app category with adjustable difficulty levels
- **Real-time usage tracking** — Background tracking of app open times and session durations (where platform APIs permit)
- **Progress visualization** — Animated progress rings, streak counters, and weekly trend charts
- **Mindful interruption system** — Context-aware notifications that suggest alternatives ("You've been on Instagram for 20 minutes. Take a 2-minute walk?")
- **Achievement system** — Gamified milestones (7-day streak, 50% reduction, weekend warrior) to maintain motivation
- F**ocus mode** — Temporary blocking of distracting apps with customizable duration and break reminders
- **Weekly reports** — Automated summary of progress, challenges, and personalized recommendations

## **Architecture Decisions**

**Why React Native + Expo instead of Flutter or native development?**

- **Cross-platform reach:** Single codebase for iOS and Android—critical for a solo project
- **Expo ecosystem:** Expo provides managed workflow, over-the-air updates, and easy access to native APIs (notifications, storage) without ejecting
- **JavaScript ecosystem:** Rich library support for data visualization and UI components
- **TypeScript:** Catches platform-specific API differences at compile time rather than runtime
  
**Why React Context over Redux or Zustand?**
  
For an app with moderate state complexity (user profile, goals, daily usage, settings), Redux would be overkill. React Context with useReducer provides:
 - Predictable state updates
 - No additional dependencies
 - Simpler debugging
 - Easier testing
 - If the app scales beyond 15-20 state interactions, I would migrate to Zustand.
   
**Why local storage instead of a backend?**

Privacy-first design. Health and usage data is sensitive. Keeping everything on-device:
- Eliminates data breach risk
- Removes dependency on internet connectivity
- Respects user privacy (no analytics, no tracking)
- Reduces infrastructure cost to zero

Future versions may add optional encrypted cloud backup.

## **Challenges and Solutions**

**Challenge: Cross-platform screen-time API limitations**

iOS and Android expose screen-time data through completely different APIs (ScreenTime API vs UsageStatsManager), and iOS heavily restricts background access.

**Solution:** Implemented a platform abstraction layer that normalizes screen-time data into a common interface:
```typescript
interface UsageTracker {
  getDailyUsage(): Promise<AppUsage[]>;
  getWeeklyUsage(): Promise<AppUsage[]>;
  requestPermissions(): Promise<boolean>;
}

// Platform-specific implementations
class iOSUsageTracker implements UsageTracker { ... }
class AndroidUsageTracker implements UsageTracker { ... }
```

On iOS, where background tracking is restricted, the app uses foreground session timers as a fallback. This isn't perfect, but it provides 80% of the value with 20% of the platform complexity.

**Challenge: Battery drain from background tracking**

Continuous background monitoring significantly impacted battery life.

**Solution:** Implemented adaptive sampling. The app tracks usage in 15-minute windows rather than continuous polling. During "focus mode," it increases granularity to 1-minute intervals. This reduced battery impact by 70% while maintaining useful data resolution.

**Challenge: Notification fatigue**

Early versions sent too many notifications, causing users to disable them entirely.

**Solution:** Built a notification intelligence system that:
- Learns user response patterns (do they engage with notifications or dismiss them?)
- Limits notifications to 3 per day maximum
- Prioritizes milestone celebrations over limit warnings (positive reinforcement > negative reinforcement)
- Uses progressive delay (first notification is gentle, second is firmer, third triggers focus mode suggestion)

## **How to Run**

**Prerequisites**
- Node.js 18+
- Expo CLI (npm install -g expo-cli)
- iOS Simulator (Mac) or Android Emulator
  
**Setup**
```bash
git clone https://github.com/alfonsojose-go/TechDetox.git
cd TechDetox
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) or press i for iOS simulator / a for Android emulator.

**Build for Production**
```bash
# iOS
npx expo build:ios

# Android
npx expo build:android
```

## **What I learned**
- **Platform API fragmentation:** iOS and Android are two different worlds. Building a cross-platform app taught me to design for the lowest common denominator and layer platform-specific enhancements on top.
- **User psychology:** Punitive approaches (hard locks) create resentment. Positive approaches (goals, streaks, celebrations) create habit. I read behavioral psychology research and it directly influenced the notification strategy.
- **Mobile performance:** React Native's bridge between JavaScript and native code creates performance cliffs. I learned to profile with Flipper, identify bridge bottlenecks, and move heavy computation to native modules where necessary.

## **Links**
- [GitHub Repository](https://github.com/alfonsojose-go/TechDetox)

**License:** MIT


