# vCore - Progressbar

A modern progressbar system for vCore Framework that displays progress indicators with animations, props, and control restrictions.

## Showcase [COMING SOON]
 
## Dependencies

- [vCore](https://github.com/Vcore-Framework/vCore)

## Installation

1. Place the resource in your `resources` folder
2. Add `ensure vCore-progressbar` to your `server.cfg`
3. Make sure vCore is loaded before this resource

## Usage

### Method 1: Using Exports

```lua
exports['vCore-progressbar']:Progress({
    name = "action_name",
    duration = 5000, -- milliseconds
    label = "Doing something...",
    useWhileDead = false,
    canCancel = true,
    controlDisables = {
        disableMovement = true,
        disableCarMovement = true,
        disableMouse = false,
        disableCombat = true,
    }
}, function(cancelled)
    if not cancelled then
        print("Action completed!")
    else
        print("Action cancelled!")
    end
end)
```

### Method 2: Using vCore Object

```lua
local VCore = exports['vCore']:GetCoreObject()

VCore.Progressbar.Start({
    name = "picking",
    duration = 3000,
    label = "Picking up item..."
}, function(cancelled)
    if not cancelled then
        -- Give item to player
    end
end)
```

### Method 3: Using Events

```lua
TriggerEvent('vCore:Client:Progressbar:Start', {
    name = "crafting",
    duration = 10000,
    label = "Crafting item..."
}, function(cancelled)
    -- Handle completion
end)
```

## Advanced Usage

### With Animation

```lua
exports['vCore-progressbar']:Progress({
    name = "repair",
    duration = 8000,
    label = "Repairing vehicle...",
    animation = {
        animDict = "mini@repair",
        anim = "fixing_a_player",
        flags = 49
    },
    controlDisables = {
        disableMovement = true,
        disableCombat = true
    }
}, function(cancelled)
    -- Handle repair completion
end)
```

### With Scenario Task

```lua
exports['vCore-progressbar']:Progress({
    name = "drinking",
    duration = 5000,
    label = "Drinking...",
    animation = {
        task = "WORLD_HUMAN_DRINKING"
    }
}, function(cancelled)
    -- Handle drinking completion
end)
```

### With Props

```lua
exports['vCore-progressbar']:Progress({
    name = "eating",
    duration = 5000,
    label = "Eating...",
    prop = {
        model = "prop_cs_burger_01",
        bone = 60309, -- Right hand
        coords = vec3(0.0, 0.0, 0.0),
        rotation = vec3(0.0, 0.0, 0.0)
    }
}, function(cancelled)
    -- Handle eating completion
end)
```

### With Dual Props

```lua
exports['vCore-progressbar']:Progress({
    name = "fixing",
    duration = 10000,
    label = "Fixing...",
    prop = {
        model = "prop_tool_wrench",
        bone = 57005, -- Left hand
        coords = vec3(0.15, 0.0, 0.0),
        rotation = vec3(0.0, 0.0, 0.0)
    },
    propTwo = {
        model = "prop_tool_screwdvr",
        bone = 60309, -- Right hand
        coords = vec3(0.0, 0.0, 0.0),
        rotation = vec3(0.0, 0.0, 0.0)
    }
}, function(cancelled)
    -- Handle completion
end)
```

### With Start Event

```lua
exports['vCore-progressbar']:ProgressWithStartEvent({
    name = "lockpick",
    duration = 15000,
    label = "Lockpicking..."
}, function()
    print("Lockpicking started!")
end, function(cancelled)
    if not cancelled then
        print("Lock picked!")
    end
end)
```

### With Tick Event

```lua
exports['vCore-progressbar']:ProgressWithTickEvent({
    name = "hacking",
    duration = 20000,
    label = "Hacking system..."
}, function()
    -- This runs every frame while progressing
    -- Good for checking conditions
    if IsPedRagdoll(PlayerPedId()) then
        TriggerEvent('vCore:Client:Progressbar:Cancel')
    end
end, function(cancelled)
    -- Handle completion
end)
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | `''` | Unique identifier for the action |
| `duration` | number | `0` | Duration in milliseconds |
| `label` | string | `''` | Text displayed on progressbar |
| `useWhileDead` | boolean | `false` | Allow action while player is dead |
| `canCancel` | boolean | `true` | Allow cancelling with ESC key |
| `disarm` | boolean | `true` | Remove weapon during action |

### Control Disables

| Option | Description |
|--------|-------------|
| `disableMovement` | Prevents WASD movement and jumping |
| `disableCarMovement` | Prevents vehicle acceleration/braking |
| `disableMouse` | Prevents mouse look |
| `disableCombat` | Prevents shooting and melee |

### Animation Options

| Option | Type | Description |
|--------|------|-------------|
| `animDict` | string | Animation dictionary |
| `anim` | string | Animation name |
| `flags` | number | Animation flags (default: 49) |
| `task` | string | Scenario task name (alternative to animDict) |

### Prop Options

| Option | Type | Description |
|--------|------|-------------|
| `model` | string | Prop model name |
| `bone` | number | Bone ID (60309 = right hand, 57005 = left hand) |
| `coords` | vec3 | Position offset |
| `rotation` | vec3 | Rotation offset |

## Available Functions

### Exports

- `Progress(action, finish)` - Basic progressbar
- `ProgressWithStartEvent(action, start, finish)` - With start callback
- `ProgressWithTickEvent(action, tick, finish)` - With tick callback
- `ProgressWithStartAndTick(action, start, tick, finish)` - With both callbacks
- `IsDoingSomething()` - Check if action is active

### vCore Object Methods

```lua
VCore.Progressbar.Start(action, finish)
VCore.Progressbar.StartWithStartEvent(action, start, finish)
VCore.Progressbar.StartWithTickEvent(action, tick, finish)
VCore.Progressbar.StartWithStartAndTick(action, start, tick, finish)
VCore.Progressbar.Cancel()
VCore.Progressbar.IsActive()
```

### Events

- `vCore:Client:Progressbar:Start`
- `vCore:Client:Progressbar:StartWithStartEvent`
- `vCore:Client:Progressbar:StartWithTickEvent`
- `vCore:Client:Progressbar:StartWithStartAndTick`
- `vCore:Client:Progressbar:Cancel`
- `vCore:Client:Progressbar:ToggleBusyness`

## Common Animation Flags

| Flag | Description |
|------|-------------|
| 1 | Normal (repeat) |
| 2 | Repeat |
| 8 | Stop on last frame |
| 16 | Only upper body |
| 32 | Allow player control |
| 48 | Cancelable (16 + 32) |
| 49 | Repeat + Cancelable |

## Common Bone IDs

| Bone ID | Location |
|---------|----------|
| 57005 | Left Hand |
| 60309 | Right Hand |
| 18905 | Head |
| 24818 | Pelvis |
| 28422 | Left Foot |

## Cancelling Actions

Actions can be cancelled in three ways:

1. **Player presses ESC** (if `canCancel = true`)
2. **Player dies** (if `useWhileDead = false`)
3. **Manual cancellation**:
```lua
TriggerEvent('vCore:Client:Progressbar:Cancel')
-- or
VCore.Progressbar.Cancel()
```