# Project Summary: Interactive Corkboard Artwork Website

## Overview

A mobile-first interactive website (no desktop version yet) for exploring a single artwork composed of three panels. The experience is guided and tactile, inspired by a corkboard with pinned notes. Users navigate horizontally across panels and tap into specific regions (“pins”) to reveal contextual annotations.

---

## Core Experience Flow

### 1. Landing View

* Displays all three panels side-by-side (overview).
  -> a combination of the images landing-1.jpeg, landing-2.jpeg, and landing-3.jpeg in public/images
  into a single line with a neutral light gray background
* Minimal UI:

  * Title at top (optional)
  * “Tap to explore” call-to-action at bottom
* (for further implementation): Include loading state

---

### 2. Carousel View (Main Interaction)

* Three panels arranged horizontally as a continuous sequence (using panel-1 through panel-3 in public/images)
* Mobile-first:

  * Swipe left/right to navigate between panels
* Panels should feel like part of one sequence (not isolated slides)

  * Slight edge peeking of adjacent panels is encouraged

---

### 3. Panel Interaction

for each of the panels in the carousel:

#### Default State

* Clean artwork (no visible pins initially)
* Possibly 1–2 very subtle hints (optional)

#### Discovery Interaction

* On tap:

  * Reveal 1 nearby hotspot (pin), not all at once
* Pins are predefined (not user-generated)
* Each panel has ~4–6 pins that describe that particular detail of the artwork, provide context, etc.

---

### 4. Pin Interaction

#### Visual

* Pin anchored to a specific coordinate (percentage-based)
* Styled like a physical pushpin

#### On Tap:

* A “sticky note” appears

  * Slight rotation, shadow, tactile feel
  * Anchored to the pin
* Background subtly dims to focus attention
* Only one note visible at a time

#### On Close:

* Note fades out
* Panel returns to clean state

---

## Image System

### Assets stored in `/public/images/`

#### Types:

1. Panel images (lower res landing version and higher res panel version)
3. to be included: Detail crops (10–15 total)

#### Guidelines:

* Lazy load non-critical images

---

## Layout & Structure

### Panel System

* Each panel is its own container
* Panels arranged horizontally (flex or scroll)
* Each panel:

  * Contains image
  * Contains absolutely positioned pins

### Coordinates

* Pins use relative positioning:

  * `x: %`
  * `y: %`

---

## Interaction Model

### Navigation

* Swipe → change panel
* Tap → reveal pin / interact
* No complex gestures (keep simple)

### State Rules

* Only one pin/note active at a time
* Limit visible interactive elements
* Keep UI uncluttered

---

## Visual Design Principles

* Background: flat neutral color (gray / off-white / dark)
* Panels:

  * Slight shadow for depth
  * Centered with spacing
* Sticky notes:

  * Imperfect, slightly rotated
  * Physical/tactile feel

---

## Technical Stack

* React (component structure)
* Vite (dev/build tool)
* Framer Motion (animations)

---

## Component Structure (Suggested)

* App

  * LandingView
  * CarouselView

    * Panel

      * Image
      * Pin[]
      * StickyNote

---

## Future Considerations (Not in Scope Yet)

* User-generated pins/comments
* Backend/database
* Advanced zoom system
* Multi-artwork navigation

---

## Key Design Goals

* Mobile-first usability
* Guided exploration (not overwhelming)
* Strong sense of materiality (corkboard metaphor)
* Minimal, focused interactions
* Fast loading and smooth performance

---

## Core Principle

This is not a gallery.

It is a **guided way of seeing a drawing**, where each pin reveals a curated fragment of meaning.
