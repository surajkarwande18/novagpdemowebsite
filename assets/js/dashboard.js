// Hamburger menu
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('show');
});

// Dashboard data
const dashboardData = {
  2025: { pop:12345, literacy:87, water:92, waterSupply:85, electricity:95,
    ward:[1200,1500,1300,1100,1450],
    progress:{Jan:60,Feb:65,Mar:70,Apr:75,May:78,Jun:82,Jul:85,Aug:85,Sep:87,Oct:88,Nov:90,Dec:92},
    achievements:["नवीन शाळा उद्घाटन","स्वच्छता मोहीम यशस्वी","विकास प्रकल्प पूर्ण ५","मुफ्त वृक्षारोपण कार्यक्रम","योजना लाभार्थी वाढ 20%"]
  },
  2024: { pop:12000, literacy:85, water:90, waterSupply:82, electricity:92,
    ward:[1100,1400,1250,1000,1350],
    progress:{Jan:55,Feb:60,Mar:65,Apr:70,May:75,Jun:78,Jul:80,Aug:82,Sep:85,Oct:87,Nov:88,Dec:90},
    achievements:["नवीन ग्रंथालय स्थापना","स्वच्छता मोहीम","पाणी टाकी सुधार","विकास प्रकल्प ३","योजना लाभार्थी वाढ 15%"]
  }
};

// Update text cards
function updateTextCard(year){
  const data = dashboardData[year];
  document.getElementById('popText').innerText = data.pop.toLocaleString();
  document.getElementById('literacyText').innerText = data.literacy + '%';
  document.getElementById('waterText').innerText = data.water + '%';
  document.getElementById('waterSupplyText').innerText = data.waterSupply + '%';
  document.getElementById('electricityText').innerText = data.electricity + '%';
}

// Circle chart factory
const createCircleChart = (id,color) => new Chart(document.getElementById(id),{
  type:'doughnut',
  data:{ labels:['',''], datasets:[{ data:[0,100], backgroundColor:[color,'#e6e6e6'] }] },
  options:{
    cutout:'70%',
    responsive:true,
    maintainAspectRatio:false,  // <-- fix responsive
    plugins:{ legend:{display:false}, datalabels:{formatter:v=>v+'%', color:'#000', font:{weight:'bold',size:14}} }
  },
  plugins:[ChartDataLabels]
});

const popCircle = createCircleChart('popCircle','#FF5733');
const literacyCircle = createCircleChart('literacyCircle','#33FF57');
const waterSupplyCircle = createCircleChart('waterSupplyCircle','#33C3FF');
const electricityCircle = createCircleChart('electricityCircle','#FFD700');

// Bar chart for स्वच्छता
const waterBar = new Chart(document.getElementById('waterBar'), {
  type:'bar',
  data:{ labels:['स्वच्छता'], datasets:[{ data:[0], backgroundColor:['#3380FF'] }] },
  options:{
    indexAxis:'y',
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      datalabels:{ formatter:v=>v+'%', color:'#000', font:{weight:'bold',size:14}, anchor:'end', align:'right' },
      tooltip:{ enabled:true, mode:'nearest', intersect:true } // tooltip fix
    },
    scales:{ x:{ beginAtZero:true, max:100 } }
  },
  plugins:[ChartDataLabels]
});

// Line chart for प्रगती
const progressChart = new Chart(document.getElementById('progressChart'), {
  type:'line',
  data:{ labels:[], datasets:[{ label:'तक्रारी निराकरण (%)', data:[], borderColor:'#FF5733', fill:false, tension:0.4 }] },
  options:{ responsive:true, maintainAspectRatio:false, plugins:{ datalabels:{ display:false } }, scales:{ y:{ beginAtZero:true } } },
  plugins:[ChartDataLabels]
});

// Ward chart
const wardChart = new Chart(document.getElementById('wardChart'), {
  type:'bar',
  data:{
    labels:['वॉर्ड १','वॉर्ड २','वॉर्ड ३','वॉर्ड ४','वॉर्ड ५'],
    datasets:[{
      label:'लोकसंख्या',
      data:dashboardData[2025].ward,
      backgroundColor:['#FF5733','#33FF57','#3380FF','#FF33AA','#F1C40F'],
      borderRadius:6,
      barPercentage:0.6
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{ display:false },
      tooltip:{ mode:'index', intersect:true }, // proper tooltip
      datalabels:{ formatter:v=>v, color:'#000', font:{weight:'bold',size:14} }
    },
    scales:{ y:{ beginAtZero:true }, x:{ ticks:{ font:{ size:14 } } } }
  },
  plugins:[ChartDataLabels]
});

// Update dashboard
function updateDashboard(){
  const year = document.getElementById('yearSelect').value;
  const month = document.getElementById('monthSelect').value;
  const data = dashboardData[year];

  updateTextCard(year);

  popCircle.data.datasets[0].data = [Math.round(data.pop/150), 100-Math.round(data.pop/150)];
  popCircle.update();

  literacyCircle.data.datasets[0].data = [data.literacy, 100-data.literacy];
  literacyCircle.update();

  waterSupplyCircle.data.datasets[0].data = [data.waterSupply, 100-data.waterSupply];
  waterSupplyCircle.update();

  electricityCircle.data.datasets[0].data = [data.electricity, 100-data.electricity];
  electricityCircle.update();

  waterBar.data.datasets[0].data = [data.water];
  waterBar.update();

  if(month==='all'){
    progressChart.data.labels = Object.keys(data.progress);
    progressChart.data.datasets[0].data = Object.values(data.progress);
  } else {
    progressChart.data.labels = [month];
    progressChart.data.datasets[0].data = [data.progress[month]];
  }
  progressChart.update();

  wardChart.data.datasets[0].data = data.ward;
  wardChart.update();

  const achList = document.getElementById('achievementsList');
  achList.innerHTML='';
  data.achievements.forEach(a=>{ let li=document.createElement('li'); li.innerText=a; achList.appendChild(li); });
}

// Event listeners
document.getElementById('yearSelect').addEventListener('change', updateDashboard);
document.getElementById('monthSelect').addEventListener('change', updateDashboard);

// Initial load
updateDashboard();
