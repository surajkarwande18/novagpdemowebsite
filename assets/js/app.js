<script>
const newsData = {
  1: {
    title: "📢 ग्रामसभा बैठक सायं. ५ वाजता",
    desc: "ग्रामसभा आज सायं. ५ वाजता पंचायत भवन येथे आयोजित केली आहे. सर्व नागरिकांनी उपस्थित राहावे.",
    img: "assets/images/news1.jpg",
    pdf: "assets/pdf/gramsabha_notice.pdf"
  },
  2: {
    title: "💧 पाणीपुरवठा उद्या बंद राहील",
    desc: "मुख्य पाइपलाईन दुरुस्तीमुळे उद्या सकाळी ८ ते सायं. ६ वाजेपर्यंत पाणीपुरवठा बंद राहील.",
    img: "assets/images/news2.jpg",
    pdf: "assets/pdf/water_notice.pdf"
  },
  3: {
    title: "💡 नवीन नळजोडणी योजना सुरू",
    desc: "गावातील नवीन नळजोडणी योजनेसाठी अर्ज सुरू झाले आहेत. नागरिकांनी १५ नोव्हेंबरपूर्वी अर्ज करावा.",
    img: "assets/images/news3.jpg",
    pdf: ""
  },
  4: {
    title: "🧹 स्वच्छता अभियान आठवडा",
    desc: "गावात स्वच्छता अभियान ५ ते १० नोव्हेंबर या कालावधीत राबविण्यात येत आहे.",
    img: "assets/images/news4.jpg",
    pdf: ""
  },
  5: {
    title: "🌱 वृक्षारोपण कार्यक्रम",
    desc: "रविवार दि. ९ नोव्हेंबर रोजी सकाळी ७ वाजता शाळेच्या परिसरात वृक्षारोपण कार्यक्रम आयोजित.",
    img: "assets/images/news5.jpg",
    pdf: "assets/pdf/tree_program.pdf"
  }
};

// Elements
const modal = document.getElementById("newsModal");
const closeModal = document.getElementById("closeModal");
const title = document.getElementById("newsTitle");
const desc = document.getElementById("newsDesc");
const img = document.getElementById("newsImage");
const pdfViewer = document.getElementById("pdfViewer");
const pdfDownload = document.getElementById("pdfDownload");

// On click any news item
document.querySelectorAll(".news-item").forEach(item => {
  item.addEventListener("click", () => {
    const id = item.dataset.id;
    const data = newsData[id];
    title.textContent = data.title;
    desc.textContent = data.desc;
    img.src = data.img;
    
    if (data.pdf) {
      pdfViewer.src = data.pdf;
      pdfViewer.style.display = "block";
      pdfDownload.href = data.pdf;
      pdfDownload.style.display = "inline-block";
    } else {
      pdfViewer.style.display = "none";
      pdfDownload.style.display = "none";
    }
    modal.style.display = "block";
  });
});

// Close modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
</script>
