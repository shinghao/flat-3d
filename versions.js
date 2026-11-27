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
     extras: curtain {open: 0–1, sheer: true} · wardrobe {gap: floating mm, niche: [fromH, toH]} · panel {door: [from, to] mm along its width}
     w    = width (left↔right when rot=0), d = depth (front↔back), h = height
     rot  = degrees clockwise on the plan. At rot 0 the BACK of the item faces the
            top of the plan (bedroom windows) and the FRONT faces the bottom.
            Bed head / sofa back / wardrobe back sit on the back side.
            rot 90 → back faces right · 180 → back faces bottom · 270 → back faces left
     style: 'soft' on a sofa = plush cloud-style cushions; seats: number of seat cushions
     wallbed {bedLength} — shown closed; the Guest mode button drops it
     type = bed | sofa | table | desk | chair | wardrobe | cabinet | shelf | counter
            | fridge | tv | rug | plant | lamp | box | wallbed | curtain | panel

   Removable wall ids: yard-parapet (open service-yard side), mb-br2, br2-corridor, br2-br3, br3-corridor, br3-living,
                       bath-top, bath-divider, bath-bottom, kitchen-yard
   ========================================================================== */
window.BTO_VERSIONS = [
  { id: 'shell', name: 'Empty shell', note: 'As handed over by HDB' },

  {
    id: 'v1',
    name: 'Version 1',
    note: 'King bed, wrap-around wardrobe, curtains, TV wall, plush sofa, study + guest room, shoe cabinet, hidden storeroom door · Modern Minimal',
    finishes: { wall: '#f4f3ef', floor: { bedroom: '#d9d7d2', living: '#e2e0db' } },
    // Service yard: HDB hands it over open; add a window (needs a permit, done by the window supplier)
    removeWalls: ['yard-parapet'],
    addWalls: [[3768, 6945, 3768, 9595, 200, [win(7050, 9490, 1000, 2450)]]],
    furniture: [
      // MAIN BEDROOM — headboard on the solid wall shared with bedroom 2, away from the hot west window
      { type: 'bed', name: 'King bed (183 × 190 mattress)', x: 2160, y: 2220, w: 1930, d: 2060, h: 500, rot: 90, color: '#c4c6c7' },
      { type: 'cabinet', name: 'Bedside table', x: 2990, y: 995, w: 480, d: 400, h: 550, rot: 90, color: '#ecebe7' },
      { type: 'cabinet', name: 'Bedside table', x: 2990, y: 3445, w: 480, d: 400, h: 550, rot: 90, color: '#ecebe7' },
      // Built-in wardrobe: main run along the bathroom-side wall + tall corner unit beside the west window
      { type: 'wardrobe', name: 'Built-in wardrobe – main run', x: 1245, y: 4635, w: 2290, d: 600, h: 2600, rot: 180, color: '#eeebe5' },
      { type: 'wardrobe', name: 'Built-in wardrobe – tall corner unit', x: 400, y: 605, w: 1010, d: 600, h: 2600, rot: 270, color: '#eeebe5' },
      // CURTAINS — full length, ceiling to floor. Bedrooms: blackout.
      { type: 'curtain', name: 'Blackout curtain – master, north window', x: 1930, y: 190, w: 2440, d: 60, h: 2600, rot: 0, open: 0.75, color: '#d4d2cd' },
      { type: 'curtain', name: 'Blackout curtain – master, west window (hot side)', x: 190, y: 2720, w: 3200, d: 60, h: 2600, rot: 270, open: 0.7, color: '#d4d2cd' },
      { type: 'curtain', name: 'Blackout curtain – bedroom 2', x: 4460, y: 190, w: 2280, d: 60, h: 2600, rot: 0, open: 0.75, color: '#d4d2cd' },
      { type: 'curtain', name: 'Blackout curtain – bedroom 3', x: 7315, y: 190, w: 2170, d: 60, h: 2600, rot: 0, open: 0.75, color: '#d4d2cd' },
      { type: 'curtain', sheer: true, name: 'Sheer curtain – living (day)', x: 11795, y: 1320, w: 5150, d: 60, h: 2600, rot: 0, open: 0.35, color: '#fbfaf7' },
      { type: 'curtain', name: 'Dim-out curtain – living (night)', x: 11795, y: 1440, w: 5150, d: 60, h: 2600, rot: 0, open: 0.85, color: '#d8d6d1' },
      // FOYER — shoe cabinet filling the kitchen-side foyer wall end to end, floor to ceiling, flush and wall-matched; key tray hidden inside
      { type: 'wardrobe', name: 'Shoe cabinet – flush, wall to wall, floor to ceiling (key tray inside)', x: 9950, y: 7598, w: 1505, d: 400, h: 2600, rot: 270, color: '#eeebe5' },
      // STOREROOM (household shelter) — concealed door: full-height wall-colour panel wall on the foyer side, hidden push-latch door over the steel shelter door
      { type: 'panel', name: 'Hidden door + panel wall – storeroom (shelter)', x: 11695, y: 7475, w: 1750, d: 40, h: 2600, rot: 90, door: [500, 1400], color: '#f0eee9' },
      // BEDROOM 3 — STUDY + GUEST ROOM: queen wall bed on the door wall (folds toward the window), standing desk under the north window,
      // full-height study cabinet on the bedroom-2 wall (closed storage + open display for soft toys). Tap "Guest mode" to drop the bed.
      { type: 'wallbed', name: 'Queen wall bed – flush wall-colour panels (folds down for guests)', x: 8170, y: 3590, w: 1740, d: 450, h: 2600, rot: 180, bedLength: 2100, color: '#eeebe5' },
      { type: 'desk', name: 'Standing desk 140 × 70 (height-adjustable)', x: 7650, y: 470, w: 1400, d: 700, h: 750, rot: 0, color: '#e4e4e2' },
      { type: 'box', name: 'Monitor on arm', x: 7650, y: 260, z: 780, w: 620, d: 60, h: 380, rot: 0, color: '#1d1f22' },
      { type: 'chair', name: 'Ergonomic chair', x: 7650, y: 960, w: 650, d: 650, h: 1150, rot: 180, color: '#4a4d52' },
      { type: 'wardrobe', name: 'Study cabinet – books, cameras, electronics', x: 6405, y: 1000, w: 1500, d: 350, h: 2600, rot: 270, color: '#eeebe5' },
      { type: 'shelf', name: 'Display shelves – soft toys', x: 6405, y: 2300, w: 1100, d: 350, h: 2600, rot: 270, color: '#eeebe5' },
      // LIVING — TV on the long east wall; sofa placed for ~2.5 m eye-to-screen (65" 4K)
      { type: 'tv', name: 'Low TV ledge + wall-mounted 65" TV', x: 14190, y: 3930, w: 1800, d: 360, h: 300, rot: 90, color: '#dcdcd9' },
      { type: 'sofa', style: 'soft', seats: 3, name: 'Plush 3-seater sofa', x: 11935, y: 3930, w: 2400, d: 1050, h: 760, rot: 270, color: '#e3e0da' }
    ]
  }
];
