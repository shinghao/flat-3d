/* ============================================================================
   BTO design versions
   ----------------------------------------------------------------------------
   Each version = one way of decorating the flat. "shell" is the bare flat.

   Coordinates are in millimetres, read off the HDB plan:
     x → left to right (0 = outer face line of main bedroom's left wall, 14470 = right wall)
     y → top to bottom (0 = bedroom window wall, 9595 = kitchen back wall)

   version = {
     id:        'kebab-case-id'         // also the link: …/#id
     name:      'Shown in the switcher'
     note:      'One line about the idea'
     finishes:  { wall:'#hex', floor:{ bedroom, living, kitchen, wet, yard } }   // all optional
     removeWalls: ['wall-id', …]        // non-structural walls only (see list below)
     addWalls:  [[x1,y1,x2,y2,thickness,[door(a,b)|win(a,b,sill,head)],height]]
     furniture: [ item, … ]
   }

   item = { type, name, x, y, w, d, h, rot, color }
     x,y  = centre of the item on the plan (mm); z = height off the floor (overhead cabinets)
     extras: curtain {open: 0–1, sheer: true} · wardrobe {gap: floating mm, niche: [fromH, toH]}
     w    = width (left↔right when rot=0), d = depth (front↔back), h = height
     rot  = degrees clockwise on the plan. At rot 0 the BACK of the item faces the
            top of the plan (bedroom windows) and the FRONT faces the bottom.
            Bed head / sofa back / wardrobe back sit on the back side.
            rot 90 → back faces right · 180 → back faces bottom · 270 → back faces left
     style: 'soft' on a sofa = plush cloud-style cushions; seats: number of seat cushions
     type = bed | sofa | table | desk | chair | wardrobe | cabinet | shelf | counter
            | fridge | tv | rug | plant | lamp | box

   Removable wall ids: mb-br2, br2-corridor, br2-br3, br3-corridor, br3-living,
                       bath-top, bath-divider, bath-bottom, kitchen-yard
   ========================================================================== */
window.BTO_VERSIONS = [
  { id: 'shell', name: 'Empty shell', note: 'As handed over by HDB' },

  {
    id: 'v1',
    name: 'Version 1',
    note: 'King bed, wrap-around wardrobe, curtains, TV wall, plush sofa, shoe cabinet, storeroom · Modern Minimal',
    finishes: { wall: '#f4f3ef', floor: { bedroom: '#d9d7d2', living: '#e2e0db' } },
    furniture: [
      // MAIN BEDROOM — headboard on the solid wall shared with bedroom 2, away from the hot west window
      { type: 'bed', name: 'King bed (183 × 190 mattress)', x: 2160, y: 2220, w: 1930, d: 2060, h: 500, rot: 90, color: '#c4c6c7' },
      { type: 'cabinet', name: 'Bedside table', x: 2990, y: 995, w: 480, d: 400, h: 550, rot: 90, color: '#ecebe7' },
      { type: 'cabinet', name: 'Bedside table', x: 2990, y: 3445, w: 480, d: 400, h: 550, rot: 90, color: '#ecebe7' },
      // Built-in wardrobe wrapping the west window: main run + tall corner unit + overhead cabinets (seasonal / travel storage)
      { type: 'wardrobe', name: 'Built-in wardrobe – main run', x: 1245, y: 4635, w: 2290, d: 600, h: 2600, rot: 180, color: '#eeebe5' },
      { type: 'wardrobe', name: 'Built-in wardrobe – tall corner unit', x: 400, y: 605, w: 1010, d: 600, h: 2600, rot: 270, color: '#eeebe5' },
      { type: 'cabinet', name: 'Overhead cabinets above window – seasonal storage', x: 350, y: 2722, z: 2200, w: 3225, d: 500, h: 400, rot: 270, color: '#eeebe5' },
      // CURTAINS — full length, ceiling to floor. Bedrooms: blackout. West window: under the overhead cabinets.
      { type: 'curtain', name: 'Blackout curtain – master, north window', x: 1930, y: 190, w: 2440, d: 60, h: 2600, rot: 0, open: 0.75, color: '#d4d2cd' },
      { type: 'curtain', name: 'Blackout curtain – master, west window (hot side)', x: 190, y: 2720, w: 3200, d: 60, h: 2190, rot: 270, open: 0.7, color: '#d4d2cd' },
      { type: 'curtain', name: 'Blackout curtain – bedroom 2', x: 4460, y: 190, w: 2280, d: 60, h: 2600, rot: 0, open: 0.75, color: '#d4d2cd' },
      { type: 'curtain', name: 'Blackout curtain – bedroom 3', x: 7315, y: 190, w: 2170, d: 60, h: 2600, rot: 0, open: 0.75, color: '#d4d2cd' },
      { type: 'curtain', sheer: true, name: 'Sheer curtain – living (day)', x: 11795, y: 1320, w: 5150, d: 60, h: 2600, rot: 0, open: 0.35, color: '#fbfaf7' },
      { type: 'curtain', name: 'Dim-out curtain – living (night)', x: 11795, y: 1440, w: 5150, d: 60, h: 2600, rot: 0, open: 0.85, color: '#d8d6d1' },
      // FOYER — full-height floating shoe cabinet on the kitchen-side wall, wall-matched, with a waist-height niche for keys/parcels
      { type: 'wardrobe', name: 'Shoe cabinet – full height, floating 20 cm, key niche', x: 9950, y: 7690, w: 1380, d: 400, h: 2600, rot: 270, gap: 200, niche: [1000, 1300], color: '#eeebe5' },
      // STOREROOM (household shelter) — freestanding / removable shelving only, U-shape with an 80 cm aisle
      { type: 'shelf', name: 'Storeroom shelving – back wall', x: 14145, y: 7650, w: 1600, d: 400, h: 2300, rot: 90, color: '#d9d9d6' },
      { type: 'shelf', name: 'Storeroom shelving – north wall', x: 13022, y: 7050, w: 1845, d: 400, h: 2300, rot: 0, color: '#d9d9d6' },
      { type: 'shelf', name: 'Storeroom shelf above luggage bay', x: 13022, y: 8250, z: 1100, w: 1845, d: 400, h: 1200, rot: 180, color: '#d9d9d6' },
      { type: 'box', name: 'Luggage – large', x: 12450, y: 8260, w: 500, d: 300, h: 750, rot: 180, color: '#5d6b78' },
      { type: 'box', name: 'Luggage – cabin', x: 12980, y: 8280, w: 400, d: 250, h: 550, rot: 180, color: '#8a6f5a' },
      { type: 'box', name: 'Cordless vacuum + mop dock', x: 13620, y: 8250, w: 350, d: 350, h: 1100, rot: 180, color: '#3f4246' },
      // LIVING — TV on the long east wall; sofa placed for ~2.5 m eye-to-screen (65" 4K)
      { type: 'tv', name: 'Low TV ledge + wall-mounted 65" TV', x: 14190, y: 3930, w: 1800, d: 360, h: 300, rot: 90, color: '#dcdcd9' },
      { type: 'sofa', style: 'soft', seats: 3, name: 'Plush 3-seater sofa', x: 11935, y: 3930, w: 2400, d: 1050, h: 760, rot: 270, color: '#e3e0da' }
    ]
  }
];
