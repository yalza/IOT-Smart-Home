document.addEventListener("DOMContentLoaded", function () {
  var ctx = document.getElementById("myChart").getContext("2d");
  var queueMaxLength = 10; // Độ dài tối đa của hàng đợi

  // Khởi tạo hàng đợi với dữ liệu ban đầu
  var queue = new Array(queueMaxLength).fill(null).map(() => ({
    time: "",
    temperature: null,
    humidity: null,
    brightness: null,
  }));

  // Khởi tạo biểu đồ với dữ liệu ban đầu
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Temperature",
          data: [],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Humidity",
          data: [],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Brightness",
          data: [],
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Hàm để cập nhật dữ liệu và biểu đồ
  function updateData() {
    // Lấy thời gian hiện tại
    var now = new Date();
    var time = now.toLocaleTimeString();

    // Random giá trị cho nhiệt độ, độ ẩm và độ sáng
    var temperature = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
    var humidity = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    var brightness = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    // Thêm dữ liệu mới vào hàng đợi
    queue.push({ time, temperature, humidity, brightness });
    queue.shift(); // Loại bỏ phần tử đầu tiên (nếu hàng đợi vượt quá độ dài tối đa)

    // Cập nhật dữ liệu cho biểu đồ từ hàng đợi
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    myChart.data.datasets[1].data = [];
    myChart.data.datasets[2].data = [];

    queue.forEach((data) => {
      myChart.data.labels.push(data.time);
      myChart.data.datasets[0].data.push(data.temperature);
      myChart.data.datasets[1].data.push(data.humidity);
      myChart.data.datasets[2].data.push(data.brightness);
    });

    // Cập nhật biểu đồ
    myChart.update();
  }

  // Cập nhật dữ liệu mỗi giây
  setInterval(updateData, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  const light = document.getElementById("light");
  const toggleBtn = document.getElementById("lightToggle");

  let isOn = false; // Biến để theo dõi trạng thái đèn

  // Hàm để thay đổi trạng thái đèn và nút bật/tắt
  function toggleLight() {
    isOn = !isOn; // Đảo ngược trạng thái
    if (isOn) {
      light.src = "img/light-on.png";
      toggleBtn.innerText = "OFF";
      toggleBtn.classList.remove("active");
    } else {
      light.src = "img/light-off.png";
      toggleBtn.innerText = "ON";
      toggleBtn.classList.add("active");
    }
  }

  // Xử lý sự kiện click trên nút bật/tắt
  toggleBtn.addEventListener("click", toggleLight);
});

document.addEventListener("DOMContentLoaded", function () {
  const fan = document.getElementById("fan");
  const toggleBtn = document.getElementById("fanToggle");

  let isOn = false; // Biến để theo dõi trạng thái quạt
  // Hàm để thay đổi trạng thái quạt và nút bật/tắt
  function toggleFan() {
    isOn = !isOn; // Đảo ngược trạng thái

    if (isOn) {
      fan.style.animationPlayState = "running"; // Quay quạt khi bật
      toggleBtn.innerText = "OFF";
      toggleBtn.classList.remove("active");
    } else {
      fan.style.animationPlayState = "paused"; // Dừng quạt khi tắt
      toggleBtn.innerText = "ON";
      toggleBtn.classList.add("active");
    }
  }

  // Xử lý sự kiện click trên nút bật/tắt
  toggleBtn.addEventListener("click", toggleFan);
});
