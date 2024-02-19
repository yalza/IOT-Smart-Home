let temperatureVl;
let humidityVl;
let brightnessVl;

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
    document.getElementById("temperatureValue").innerHTML = temperature + "°C";
    var humidity = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    document.getElementById("humidityValue").innerHTML = humidity + "%";
    var brightness = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    document.getElementById("brightnessValue").innerHTML = brightness + "lux";
    changeBackground(
      temperatureCard,
      temperature,
      32,
      22,
      "linear-gradient(to bottom, #FF0000, #FFFF00)",
      "linear-gradient(to bottom, #F0DE4D, #F0B64D)",
      "linear-gradient(to bottom, #00FFFF, #0000FF)"
    );
    changeBackground(
      humidityCard,
      humidity,
      80,
      40,
      "linear-gradient(to bottom, #075EAA, #010F79)",
      "linear-gradient(to bottom, #4DCFF0, #0E30F0)",
      "linear-gradient(to bottom, #4DCFF0, #4D9BF0)"
    );
    changeBackground(
      brightnessCard,
      brightness,
      400,
      100,
      "linear-gradient(to bottom, #FBFF00, #FFE100)",
      "linear-gradient(to bottom, #D9BF00, #FBFF00)",
      "linear-gradient(to bottom, #D9BF00, #9B9E00)"
    );

    temperatureVl = temperature;
    humidityVl = humidity;
    brightnessVl = brightness;

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

  let isOn = true; // Biến để theo dõi trạng thái đèn

  // Hàm để thay đổi trạng thái đèn và nút bật/tắt
  function toggleLight() {
    isOn = !isOn; // Đảo ngược trạng thái
    if (isOn) {
      light.src = "img/light-on.png";
      toggleBtn.innerText = "ON";
      toggleBtn.classList.add("active");
    } else {
      light.src = "img/light-off.png";
      toggleBtn.innerText = "OFF";
      toggleBtn.classList.remove("active");
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
      toggleBtn.innerText = "ON";
      toggleBtn.classList.add("active");
    } else {
      fan.style.animationPlayState = "paused"; // Dừng quạt khi tắt
      toggleBtn.innerText = "OFF";
      toggleBtn.classList.remove("active");
    }
  }

  // Xử lý sự kiện click trên nút bật/tắt
  toggleBtn.addEventListener("click", toggleFan);
});

//Change Background

var temperatureCard = document.getElementById("temperatureCard");
var temperature = document.getElementById("temperatureValue");
var temperatureValue = parseInt(temperature.innerHTML);

var humidityCard = document.getElementById("humidityCard");
var humidity = document.getElementById("humidityValue");
var humidityValue = parseInt(humidity.innerHTML);

var brightnessCard = document.getElementById("brightnessCard");
var brightness = document.getElementById("brightnessValue");
var brightnessValue = parseInt(brightness.innerHTML);

function changeBackground(
  box,
  value,
  maxValue,
  minValue,
  color1,
  color2,
  color3
) {
  if (value >= maxValue) {
    box.style.background = color1;
  } else if (value >= minValue && value < maxValue) {
    box.style.background = color2;
  } else if (value < minValue) {
    box.style.background = color3;
  }
}
