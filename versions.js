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
     x,y  = centre of the item on the plan (mm)
     w    = width (left↔right when rot=0), d = depth (front↔back), h = height
     rot  = degrees clockwise on the plan. At rot 0 the BACK of the item faces the
            top of the plan (bedroom windows) and the FRONT faces the bottom.
            Bed head / sofa back / wardrobe back sit on the back side.
            rot 90 → back faces right · 180 → back faces bottom · 270 → back faces left
     style: 'soft' on a sofa = plush cloud-style cushions
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
    note: 'King bed, built-in wardrobe, TV on the east wall, plush sofa',
    furniture: [
      // MAIN BEDROOM — headboard on the solid wall shared with bedroom 2, away from the hot west window
      { type: 'bed', name: 'King bed (183 × 190 mattress)', x: 2160, y: 2220, w: 1930, d: 2060, h: 500, rot: 90, color: '#9b8a76' },
      { type: 'cabinet', name: 'Bedside table', x: 2990, y: 995, w: 480, d: 400, h: 550, rot: 90, color: '#c8b8a2' },
      { type: 'cabinet', name: 'Bedside table', x: 2990, y: 3445, w: 480, d: 400, h: 550, rot: 90, color: '#c8b8a2' },
      { type: 'wardrobe', name: 'Built-in wardrobe, floor to ceiling', x: 1245, y: 4635, w: 2290, d: 600, h: 2600, rot: 180, color: '#ebe5da' },
      // LIVING — TV on the long east wall; sofa placed for ~2.5 m eye-to-screen (65" 4K)
      { type: 'tv', name: 'TV console + 65" TV', x: 14170, y: 3930, w: 2000, d: 400, h: 450, rot: 90, color: '#7a6652' },
      { type: 'sofa', style: 'soft', name: 'Plush 3-seater sofa', x: 11935, y: 3930, w: 2400, d: 1050, h: 760, rot: 270, color: '#cdbfa9' }
    ]
  }
];
