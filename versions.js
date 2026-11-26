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
     type = bed | sofa | table | desk | chair | wardrobe | cabinet | shelf | counter
            | fridge | tv | rug | plant | lamp | box

   Removable wall ids: mb-br2, br2-corridor, br2-br3, br3-corridor, br3-living,
                       bath-top, bath-divider, bath-bottom, kitchen-yard
   ========================================================================== */
window.BTO_VERSIONS = [
  { id: 'shell', name: 'Empty shell', note: 'As handed over by HDB' },

  {
    id: 'example',
    name: 'Example layout',
    note: 'Test version to try the switcher. Will be replaced by real designs.',
    finishes: { floor: { bedroom: '#c9a67e', living: '#d8cdbd' } },
    furniture: [
      // main bedroom
      { type: 'bed', name: 'Queen bed', x: 2175, y: 2300, w: 1530, d: 2030, h: 500, rot: 90, color: '#8d7b68' },
      { type: 'wardrobe', name: 'Wardrobe', x: 1205, y: 4635, w: 2290, d: 600, h: 2400, rot: 180, color: '#e8e2d6' },
      // bedroom 2
      { type: 'bed', name: 'Single bed', x: 4260, y: 1400, w: 1070, d: 1900, h: 450, rot: 270, color: '#9aa7b0' },
      // bedroom 3 study
      { type: 'desk', name: 'Desk', x: 7600, y: 420, w: 1400, d: 600, h: 750, rot: 0, color: '#b89a74' },
      { type: 'chair', name: 'Desk chair', x: 7600, y: 1050, w: 550, d: 550, h: 950, rot: 180, color: '#3d3f44' },
      // living
      { type: 'rug', name: 'Rug', x: 12100, y: 4300, w: 2000, d: 1600, rot: 90, color: '#bfb3a2' },
      { type: 'sofa', name: '3-seater sofa', x: 10650, y: 4300, w: 2100, d: 900, h: 800, rot: 270, color: '#7c8a83' },
      { type: 'tv', name: 'TV console + 65" TV', x: 14170, y: 4300, w: 1800, d: 400, h: 450, rot: 90, color: '#6b5a49' },
      // dining
      { type: 'table', name: 'Dining table', x: 7450, y: 5950, w: 1500, d: 850, h: 750, rot: 0, color: '#a8865f' },
      { type: 'chair', name: 'Dining chair', x: 7050, y: 5250, w: 450, d: 450, h: 850, rot: 0, color: '#a8865f' },
      { type: 'chair', name: 'Dining chair', x: 7850, y: 5250, w: 450, d: 450, h: 850, rot: 0, color: '#a8865f' },
      { type: 'chair', name: 'Dining chair', x: 7050, y: 6650, w: 450, d: 450, h: 850, rot: 180, color: '#a8865f' },
      { type: 'chair', name: 'Dining chair', x: 7850, y: 6650, w: 450, d: 450, h: 850, rot: 180, color: '#a8865f' },
      // kitchen
      { type: 'counter', name: 'Kitchen counter', x: 7600, y: 9195, w: 3400, d: 600, h: 900, rot: 180, color: '#dcd8cf' },
      { type: 'fridge', name: 'Fridge', x: 9200, y: 7450, w: 700, d: 700, h: 1800, rot: 90, color: '#c9cccf' },
      { type: 'plant', name: 'Plant', x: 13900, y: 1700, w: 500, d: 500, h: 1300, rot: 0, color: '#5f7d5a' }
    ]
  }
];
