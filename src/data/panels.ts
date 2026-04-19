export interface Pin {
  id: string;
  x: number; // percentage (0–100)
  y: number; // percentage (0–100)
  label: string;
  note: string;
  detailImage: string;
}

export interface PanelData {
  id: number;
  imageSrc: string;
  landingImageSrc: string;
  pins: Pin[];
}

export const panels: PanelData[] = [
  {
    id: 1,
    imageSrc: "/images/panel-1.jpeg",
    landingImageSrc: "/images/landing-1.jpeg",
    pins: [
      {
        id: "p1-1",
        x: 25,
        y: 30,
        label: "Detail A",
        note: "Notice the intricate linework in this area — each stroke was drawn in a single pass without lifting the pen.",
        detailImage: "/images/details/p1-1.jpeg",
      },
      {
        id: "p1-2",
        x: 60,
        y: 20,
        label: "Detail B",
        note: "This cluster of marks references early shorthand writing systems used in 19th-century correspondence.",
        detailImage: "/images/details/p1-2.jpeg",
      },
      {
        id: "p1-3",
        x: 40,
        y: 65,
        label: "Detail C",
        note: "The density shifts here — the artist intentionally left negative space to guide your eye downward.",
        detailImage: "/images/details/p1-3.jpeg",
      },
      {
        id: "p1-4",
        x: 75,
        y: 50,
        label: "Detail D",
        note: "A recurring motif: this glyph-like shape appears across all three panels, connecting them as a sequence.",
        detailImage: "/images/details/p1-4.jpeg",
      },
      {
        id: "p1-5",
        x: 15,
        y: 80,
        label: "Detail E",
        note: "The paper texture is visible through the lighter marks — the medium becomes part of the composition.",
        detailImage: "/images/details/p1-5.jpeg",
      },
    ],
  },
  {
    id: 2,
    imageSrc: "/images/panel-2.jpeg",
    landingImageSrc: "/images/landing-2.jpeg",
    pins: [
      {
        id: "p2-1",
        x: 35,
        y: 25,
        label: "Detail F",
        note: "This section mirrors a passage from the artist's notebook — a direct transcription of thought into mark.",
        detailImage: "/images/details/p2-1.jpeg",
      },
      {
        id: "p2-2",
        x: 70,
        y: 40,
        label: "Detail G",
        note: "The rhythm changes here: shorter, more staccato strokes suggest urgency or emphasis.",
        detailImage: "/images/details/p2-2.jpeg",
      },
      {
        id: "p2-3",
        x: 20,
        y: 55,
        label: "Detail H",
        note: "Look closely — there's a faint underlay of erased marks, traces of earlier decisions still visible.",
        detailImage: "/images/details/p2-3.jpeg",
      },
      {
        id: "p2-4",
        x: 55,
        y: 75,
        label: "Detail I",
        note: "The central panel acts as a bridge. This area shares visual vocabulary with both Panel 1 and Panel 3.",
        detailImage: "/images/details/p2-4.jpeg",
      },
    ],
  },
  {
    id: 3,
    imageSrc: "/images/panel-3.jpeg",
    landingImageSrc: "/images/landing-3.jpeg",
    pins: [
      {
        id: "p3-1",
        x: 30,
        y: 20,
        label: "Detail J",
        note: "The marks dissolve toward the edges — the composition breathes outward, resisting containment.",
        detailImage: "/images/details/p3-1.jpeg",
      },
      {
        id: "p3-2",
        x: 65,
        y: 35,
        label: "Detail K",
        note: "This area was drawn last. The ink sits on top of earlier layers, creating a sense of depth and time.",
        detailImage: "/images/details/p3-2.jpeg",
      },
      {
        id: "p3-3",
        x: 45,
        y: 60,
        label: "Detail L",
        note: "A moment of near-legibility — these forms hover between writing and drawing, language and image.",
        detailImage: "/images/details/p3-3.jpeg",
      },
      {
        id: "p3-4",
        x: 80,
        y: 70,
        label: "Detail M",
        note: "The final marks of the triptych. The gesture trails off, leaving the viewer at the edge of meaning.",
        detailImage: "/images/details/p3-4.jpeg",
      },
      {
        id: "p3-5",
        x: 15,
        y: 45,
        label: "Detail N",
        note: "Contrast this dense cluster with the openness around it — the artist uses space as punctuation.",
        detailImage: "/images/details/p3-5.jpeg",
      },
    ],
  },
];
