// เลือก elements จาก dom ด้วย id
const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;      
let hrs = 0;
let mins = 0;
let secs = 0;     

// เพิ่ม event ให้กับปุ่ม start
startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);//  setInterval ให้อัปเดตเวลาทุกๆ 1 วินาที
    }
});
// เพิ่ม event ให้กับปุ่ม stop
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId); //หยุดการทำงานของ interval
    }
});
// เพิ่ม event ให้กับปุ่ม reset
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00";// รีเซ็ตเวลาที่แสดงบนหน้าจอ
});

// ฟังก์ชันที่ใช้ในการอัปเดตเวลาและแสดงผล
function updateTime(){
    elapsedTime = Date.now() - startTime;
    //คำนวณ วินาที นาที และ ชั่วโมง 
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;//ถ้าตัวใน unit มีความยาวมากกว่า 2 จะเป็นค่าเดิมแต่ถ้าไม่ จะเติม 0 ข้างหน้า  
                                                                                                      
    }

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`; // กำหนด format และแสดงผลเวลาที่อัปเดตแล้วบนหน้าจอ

   
}
