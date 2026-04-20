document.addEventListener('DOMContentLoaded', () => {

  function tick() {
    const now = new Date();
    document.getElementById('clock-pl').textContent = now.toLocaleTimeString('pl-PL', { timeZone:'Europe/Warsaw' });
    document.getElementById('clock-uk').textContent = now.toLocaleTimeString('en-GB', { timeZone:'Europe/London' });
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-GB', {
      weekday:'long', day:'2-digit', month:'long', year:'numeric'
    });
  }
  setInterval(tick, 1000); tick();

  const DATA = {
    London:['City of London','Bristol','Camden','Croydon','Ealing','Greenwich','Hackney','Haringey','Harrow','Havering','Hillingdon','Hounslow','Islington','Kensington','Lambeth','Waltham','Wandsworth','Westminster','Ilford'],
    England:['Bury','Chatham','Cheadle','Fareham','Gillingham','Leeds','Manchester','Oldham','Oxford','Plymouth','Sale','Sheffield','Southampton','Stockport','Warrington','Wigan'],
    Scotland:['Clackmannan','Dundee','Edinburgh','Elgin','Glasgow'],
    Wales:['Cardiff']
  };

  // ✅ Corrected terms incl. Easter Holidays
  const TERMS = [
    { n:'Spring Term',        s:'2026-01-05', e:'2026-02-13', t:'Term' },
    { n:'Spring Half Term',   s:'2026-02-14', e:'2026-02-20', t:'Holiday' },
    { n:'Spring Term',        s:'2026-02-23', e:'2026-03-27', t:'Term' },

    // ✅ Missing period fixed
    { n:'Easter Holidays',    s:'2026-03-30', e:'2026-04-10', t:'Holiday' },

    { n:'Summer Term',        s:'2026-04-13', e:'2026-05-22', t:'Term' },
    { n:'Summer Half Term',   s:'2026-05-25', e:'2026-05-29', t:'Holiday' },
    { n:'Summer Term',        s:'2026-06-01', e:'2026-07-22', t:'Term' }
  ];

  const region = document.getElementById('region');
  const city = document.getElementById('city');
  const table = document.getElementById('termTable');
  const tableBox = document.getElementById('tableContainer');

  Object.keys(DATA).forEach(r => {
    const o = document.createElement('option');
    o.value = r; o.textContent = r;
    region.appendChild(o);
  });

  region.addEventListener('change', () => {
    city.innerHTML = '<option value="">Select city</option>';
    city.disabled = true; tableBox.style.display='none';
    (DATA[region.value] || []).forEach(c => {
      const o=document.createElement('option'); o.value=c; o.textContent=c; city.appendChild(o);
    });
    city.disabled = false;
  });

  const fmt = d => new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});

  city.addEventListener('change', () => {
    table.innerHTML = '';
    TERMS.forEach(p => {
      const status = p.t === 'Term' ? 'Closed road' : 'Road Open';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.n}</td>
        <td>${fmt(p.s)}</td>
        <td>${fmt(p.e)}</td>
        <td class="${p.t==='Term'?'term':'holiday'}">${p.t}</td>
        <td class="${p.t==='Term'?'closed':'open'}">${status}</td>
      `;
      table.appendChild(tr);
    });
    tableBox.style.display='block';
  });
});