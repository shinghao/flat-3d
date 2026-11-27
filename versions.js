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

   item = { type, name, x, y, w, d, h, rot, color, room? }   (room: optional tag, e.g. 'study', used to swap a room between versions)
     x,y  = centre of the item on the plan (mm); z = height off the floor (overhead cabinets)
     extras: curtain {open: 0–1, sheer: true} · wardrobe {gap: floating mm, niche: [fromH, toH]} · panel {door: [from, to] mm along its width}
     w    = width (left↔right when rot=0), d = depth (front↔back), h = height
     rot  = degrees clockwise on the plan. At rot 0 the BACK of the item faces the
            top of the plan (bedroom windows) and the FRONT faces the bottom.
            Bed head / sofa back / wardrobe back sit on the back side.
            rot 90 → back faces right · 180 → back faces bottom · 270 → back faces left
     style: 'soft' on a sofa = plush cloud-style cushions; seats: number of seat cushions
     wallbed {bedLength} — shown folded up; tap it in the viewer to fold it down
     standdesk · monitor {arm: drop to desk mm} · officechair
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
    note: 'King bed, wrap-around wardrobe, curtains, TV wall, plush sofa, study, guest room (wall bed), shoe cabinet, hidden storeroom door · Modern Minimal',
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
      // BEDROOM 2 — GUEST ROOM: queen wall bed on the master-bedroom-side wall, folds out toward bedroom 3. Rest of the room free for daily use (TBD).
      { type: 'wallbed', name: 'Queen wall bed – guest room, flush wall-colour panels', x: 3535, y: 1170, w: 1740, d: 450, h: 2600, rot: 270, bedLength: 2100, color: '#eeebe5' },
      // BEDROOM 3 — STUDY for two. Desks on the long solid wall (shared with living): daylight from the side, no screen glare, window kept clear.
      // Shing: 160 cm motorised desk, dual 27" monitors on a dual arm (toed in), laptop on stand. Partner: 120 cm desk, one 27" monitor. Closed cabinet opposite.
      { room: 'study', type: 'standdesk', name: 'Shing – motorised standing desk 160 × 75', x: 8685, y: 1060, w: 1600, d: 750, h: 740, rot: 90, color: '#e9e8e4' },
      { room: 'study', type: 'monitor', name: '27" monitor (left) on dual arm', x: 8900, y: 750, z: 900, w: 615, d: 40, h: 365, arm: 160, rot: 78 },
      { room: 'study', type: 'monitor', name: '27" monitor (right) on dual arm', x: 8900, y: 1370, z: 900, w: 615, d: 40, h: 365, arm: 160, rot: 102 },
      { room: 'study', type: 'rug', name: 'Desk mat', x: 8540, y: 1060, z: 740, w: 900, d: 400, h: 3, rot: 90, color: '#3a3d42' },
      { room: 'study', type: 'box', name: 'Keyboard', x: 8500, y: 1060, z: 743, w: 440, d: 140, h: 25, rot: 90, color: '#2a2c2f' },
      { room: 'study', type: 'box', name: 'Laptop on stand', x: 8800, y: 1720, z: 740, w: 320, d: 240, h: 170, rot: 90, color: '#b9bcc0' },
      { room: 'study', type: 'officechair', name: 'Ergonomic chair (mesh, headrest)', x: 7980, y: 1060, w: 680, d: 680, h: 1250, rot: 270, color: '#3a3d42' },
      { room: 'study', type: 'standdesk', name: 'Partner – motorised standing desk 120 × 75', x: 8685, y: 2510, w: 1200, d: 750, h: 740, rot: 90, color: '#e9e8e4' },
      { room: 'study', type: 'monitor', name: '27" monitor on arm', x: 8900, y: 2510, z: 900, w: 615, d: 40, h: 365, arm: 160, rot: 90 },
      { room: 'study', type: 'box', name: 'Keyboard', x: 8500, y: 2510, z: 743, w: 440, d: 140, h: 25, rot: 90, color: '#e6e6e3' },
      { room: 'study', type: 'officechair', name: 'Ergonomic chair (mesh, headrest)', x: 7980, y: 2510, w: 680, d: 680, h: 1250, rot: 270, color: '#8c9096' },
      { room: 'study', type: 'wardrobe', name: 'Study cabinet – full height, closed (books, cameras, electronics, documents)', x: 6430, y: 1725, w: 2250, d: 400, h: 2600, rot: 270, color: '#eeebe5' },
      { room: 'study', type: 'plant', name: 'Tall plant (window corner)', x: 6480, y: 380, w: 450, d: 450, h: 1500, rot: 0, color: '#5f7d5a' },
      // LIVING — TV on the long east wall; sofa placed for ~2.5 m eye-to-screen (65" 4K)
      { type: 'tv', name: 'Low TV ledge + wall-mounted 65" TV', x: 14190, y: 3930, w: 1800, d: 360, h: 300, rot: 90, color: '#dcdcd9' },
      { type: 'sofa', style: 'soft', seats: 3, name: 'Plush 3-seater sofa', x: 11935, y: 3930, w: 2400, d: 1050, h: 760, rot: 270, color: '#e3e0da' }
    ]
  }
];

// ---- Version 2: same as Version 1, study flipped -------------------------------------------------
// Desks on the Bedroom 2 wall (quieter, away from the TV); full-length cabinet on the living-room wall;
// study door re-hung on the other side (new concealed doors anyway) so it doesn't swing into the desks.
(function () {
  const v1 = window.BTO_VERSIONS.find(v => v.id === 'v1');
  if (!v1) return;
  window.BTO_VERSIONS.push({
    ...v1,
    id: 'v2',
    name: 'Version 2',
    note: 'Version 1 with the study flipped: desks on the quiet Bedroom 2 wall, full-length cabinet on the living-room wall',
    removeWalls: [...(v1.removeWalls || []), 'br3-corridor'],
    addWalls: [...(v1.addWalls || []), [6170, 3875, 9120, 3875, 120, [door(6300, 7150, 2100, -1, 'flush', true)]]],
    furniture: v1.furniture.filter(i => i.room !== 'study').concat([
      { room: 'study', type: 'standdesk', name: 'Shing – motorised standing desk 160 × 75', x: 6605, y: 1060, w: 1600, d: 750, h: 740, rot: 270, color: '#e9e8e4' },
      { room: 'study', type: 'monitor', name: '27" monitor (left) on dual arm', x: 6390, y: 1370, z: 900, w: 615, d: 40, h: 365, arm: 160, rot: 258 },
      { room: 'study', type: 'monitor', name: '27" monitor (right) on dual arm', x: 6390, y: 750, z: 900, w: 615, d: 40, h: 365, arm: 160, rot: 282 },
      { room: 'study', type: 'rug', name: 'Desk mat', x: 6750, y: 1060, z: 740, w: 900, d: 400, h: 3, rot: 270, color: '#3a3d42' },
      { room: 'study', type: 'box', name: 'Keyboard', x: 6790, y: 1060, z: 743, w: 440, d: 140, h: 25, rot: 270, color: '#2a2c2f' },
      { room: 'study', type: 'box', name: 'Laptop on stand', x: 6490, y: 1720, z: 740, w: 320, d: 240, h: 170, rot: 270, color: '#b9bcc0' },
      { room: 'study', type: 'officechair', name: 'Ergonomic chair (mesh, headrest)', x: 7310, y: 1060, w: 680, d: 680, h: 1250, rot: 90, color: '#3a3d42' },
      { room: 'study', type: 'standdesk', name: 'Partner – motorised standing desk 120 × 75', x: 6605, y: 2510, w: 1200, d: 750, h: 740, rot: 270, color: '#e9e8e4' },
      { room: 'study', type: 'monitor', name: '27" monitor on arm', x: 6390, y: 2510, z: 900, w: 615, d: 40, h: 365, arm: 160, rot: 270 },
      { room: 'study', type: 'box', name: 'Keyboard', x: 6790, y: 2510, z: 743, w: 440, d: 140, h: 25, rot: 270, color: '#e6e6e3' },
      { room: 'study', type: 'officechair', name: 'Ergonomic chair (mesh, headrest)', x: 7310, y: 2510, w: 680, d: 680, h: 1250, rot: 90, color: '#8c9096' },
      { room: 'study', type: 'wardrobe', name: 'Study cabinet – full length, floor to ceiling, closed', x: 8860, y: 1957, w: 3715, d: 400, h: 2600, rot: 90, color: '#eeebe5' }
    ])
  });
})();
