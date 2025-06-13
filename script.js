const inputShiftStart = document.querySelector("#shift-start");
const inputShiftEnd = document.querySelector("#shift-end");
const submitBtn = document.querySelector(".submit");
const shiftType = document.querySelector("#dropdown");
const shiftTimingsDiv = document.querySelector(".div__times");
const displayHTML = document.querySelector(".result__div");
const resultDiv = document.querySelector(".result");
resultDiv.classList.remove("result__div");
let yesBtn;
let noBtn;

// When submit button is clicked.
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const startTime = inputShiftStart.value; // get the start time values inputted by the user.
  const endTime = inputShiftEnd.value; // get the end time values inputted by the user.
  console.log(startTime);
  console.log(endTime);
  if (startTime === "" || endTime === "") {
    alert("⛔️ Please enter your shift times below before clicking submit.");
    return;
  }
  // when the shift-type is -> FPTA.
  console.log(shiftType.value);
  const regularPayRateFPTA = 27.49; // Regular pay rate for FPTA.
  const regularPayRateVB = 28.39; // Regular pay rate for FPTA.
  if (shiftType.value === "FPTA") {
    const shiftType = "FPTA";
    calculatePay(startTime, endTime, regularPayRateFPTA, shiftType); // call the function to calculate the pay for FPTA.
  }
  if (shiftType.value === "VB") {
    const shiftType = "VB";
    calculatePay(startTime, endTime, regularPayRateVB, shiftType); // call the function to calculate the pay for VB.
    console.log("You selected VB as your shift");
  }
});

// Calculate pay for the shifts -> FPTA, VB (Only the variable 'regularPayRate' is different for both the shifts)
function calculatePay(startTime, endTime, regularPayRate, shiftType) {
  const startHour = Number(startTime.slice(0, 2)); // get only the shift start hours. -> '06'
  const endHour = Number(endTime.slice(0, 2)); // get only the shift start minutes.
  const startMinutes = Number(startTime.slice(3, 5)); // get only the shift start minutes. -> '20'
  const endMinutes = Number(endTime.slice(3, 5)); // get only the shift end minutes. -> '50'
  const hoursWorked = Number(endHour) - Number(startHour) - 1; // get only the hours worked -> '07'
  const minutesWorked = Math.abs(Number(endMinutes) - Number(startMinutes)); // get only minutes worked -> '30'
  console.log(hoursWorked);
  const payForHours = hoursWorked * regularPayRate;
  const payForMinutes = 0.5 * regularPayRate;
  const totalPay = payForHours + payForMinutes;
  // if shift times entered are above 8 hours.
  if (
    hoursWorked > 7 ||
    minutesWorked > 30 ||
    minutesWorked > 30 ||
    hoursWorked > 8 ||
    hoursWorked < 7 ||
    minutesWorked < 30 ||
    startHour > endHour // if startHour entered is greater than that of the end Hour.
  ) {
    // If the minutes are above 30 min, there is no check. the user can enter wrong shift times totalling times from 7h:31m to 7h:59m. This 'if' condition only checks if total hours worked are below or above 7 hours.
    alert(
      `⏰ Please enter your shift times accurately.\n \n🕵🏻‍♀️ Ticket agents typically get scheduled for 7.5 hours.\n \n⏳ The shift times you entered are: ${startHour}:${startMinutes} ${
        startHour < 12 ? "AM" : "PM"
      } - ${endHour}:${endMinutes} ${endHour < 12 ? "AM" : "PM"}.`
    );
    location.reload();
    return;
  }
  console.log(hoursWorked + ":" + minutesWorked);
  console.log(startHour, endHour, startMinutes, endMinutes);
  console.log(payForHours, payForMinutes);
  console.log(payForHours + payForMinutes);
  // if the shift starts before 8 AM.
  if (startHour < 8) {
    // call the before_8 function.
    calculatePayIfBefore_8AM(
      startHour,
      endHour,
      startMinutes,
      endMinutes,
      hoursWorked,
      regularPayRate, // regular-Pay-rate is passed by both the FPTA Shift and VB Shift with corresponding Pay Rates.
      shiftType
    );
  }
  // if the shift ends after 5 pm (Because no shift starts after 5pm. Shifts always start before 5 PM.)
  else if (endHour > 17) {
    calculatePayIfAfter_5PM(
      startHour,
      endHour,
      startMinutes,
      endMinutes,
      hoursWorked,
      regularPayRate, // regular-Pay-rate is passed by both the FPTA Shift and VB Shift with corresponding Pay Rates.
      shiftType
    );
  }
  // if the shift doesn't start before 8 am or if shift doesn't end after 5 pm.
  else {
    console.log(`Your total pay before taxes is: ${totalPay}`);
    const extraPay = 0;
    displayResultIfNotBefore_8AndNotAfter_5(
      startHour,
      startMinutes,
      endHour,
      endMinutes,
      hoursWorked,
      minutesWorked,
      payForHours,
      payForMinutes,
      totalPay,
      regularPayRate,
      extraPay,
      shiftType
    );
  }
}

// CALCULATE PAY FOR SHIFTS BEFORE '8AM'
function calculatePayIfBefore_8AM(
  startHour,
  endHour,
  startMinutes,
  endMinutes,
  hoursWorked,
  regularPayRate, // regular-Pay-rate is passed by both the FPTA Shift and VB Shift with corresponding Pay Rates.
  shiftType
) {
  const specialPayRateFPTA = regularPayRate * 0.15;
  const newPayRate = regularPayRate + specialPayRateFPTA;
  const totalHoursBefore_8 = 8 - startHour - 1;
  const totalMinutesBefore_8 = 60 - startMinutes;
  console.log(totalHoursBefore_8);
  console.log(newPayRate);
  console.log(totalMinutesBefore_8);
  console.log(
    "Total hours before 8: " + totalHoursBefore_8 + ":" + totalMinutesBefore_8
  );
  const payForHoursBefore_8 = totalHoursBefore_8 * newPayRate;
  const totalMinutesConvertedToDecimalNumbers = parseFloat(
    (totalMinutesBefore_8 / 60).toFixed(1)
  );
  const payForMinutesBefore_8 =
    totalMinutesConvertedToDecimalNumbers * newPayRate;
  const totalPayBefore_8 = payForHoursBefore_8 + payForMinutesBefore_8;
  console.log(totalPayBefore_8);
  const hoursAfter_8 = endHour - startHour - totalHoursBefore_8 - 1;
  const convertedMinutesAfter_8 = parseFloat((endMinutes / 60).toFixed(2));
  const payForHoursAfter_8 = hoursAfter_8 * regularPayRate;
  const payForMinutesAfter_8 = convertedMinutesAfter_8 * regularPayRate;
  const totalPayAfter_8 =
    hoursAfter_8 * regularPayRate + convertedMinutesAfter_8 * regularPayRate;

  const extraPay =
    specialPayRateFPTA *
    (totalHoursBefore_8 + totalMinutesConvertedToDecimalNumbers);
  const totalCumulativePay = parseFloat(
    (totalPayBefore_8 + totalPayAfter_8).toFixed(2)
  );
  console.log(`Your total pay before taxes is: $${totalCumulativePay}`);
  console.log(
    `Your total pay if you worked before 8 am is: ${totalCumulativePay}. \nThe breakdown is as this - Pay before 8: ${totalPayBefore_8}, Pay after 8: ${totalPayAfter_8}, minutes after 8 is: ${convertedMinutesAfter_8}, minutes before 8 is: ${totalMinutesConvertedToDecimalNumbers}, hours before 8 is ${totalHoursBefore_8}\n Pay for the hours before 8 is ${payForHoursBefore_8} and minutes before 8 is ${payForMinutesBefore_8}\n Pay for hours after 8 is ${
      hoursAfter_8 * regularPayRate
    } and minutes after 8 is ${
      convertedMinutesAfter_8 * regularPayRate
    } \n minutes after 8 is: ${convertedMinutesAfter_8} hours after 8 is ${hoursAfter_8} `
  );
  console.log(
    `Total hours worked today are: ${
      totalHoursBefore_8 + hoursAfter_8
    } hours, ${totalMinutesBefore_8 + endMinutes} mins.`
  );
  displayResultBefore_8AM(
    endMinutes,
    payForHoursBefore_8,
    payForMinutesBefore_8,
    payForHoursAfter_8,
    payForMinutesAfter_8,
    totalHoursBefore_8,
    totalMinutesBefore_8,
    hoursAfter_8,
    totalCumulativePay,
    regularPayRate,
    extraPay,
    shiftType,
    startHour,
    startMinutes,
    endHour
  );

  setTimeout(function () {}, 1000);
}

// CALCULATE PAY FOR SHIFTS AFTER '5PM'
function calculatePayIfAfter_5PM(
  startHour,
  endHour,
  startMinutes,
  endMinutes,
  hoursWorked,
  regularPayRate, // regular-Pay-rate is passed by both the FPTA Shift and VB Shift with corresponding Pay Rates.
  shiftType
) {
  const specialPayRateFPTA = regularPayRate * 0.15;
  const newPayRate = regularPayRate + specialPayRateFPTA;
  const totalHoursAfter_5 = endHour - 17; // 5pm is 17. Ending shift hour minus 17-> hours after 5.
  const endMinutesConverted = parseFloat((endMinutes / 60).toFixed(2)); // total minutes in decimals.
  console.log(endMinutesConverted);
  const payForMinutesAfter_5 = newPayRate * endMinutesConverted;
  const payForHoursAfter_5 = newPayRate * totalHoursAfter_5;
  const totalHoursBefore_5 = endHour - 1 - startHour - totalHoursAfter_5;
  const payForHoursBefore_5 = totalHoursBefore_5 * regularPayRate;
  const extraPay =
    specialPayRateFPTA * (totalHoursAfter_5 + endMinutesConverted);

  const minutesBefore_5 = 60 - startMinutes; // calculate minutes at the start of the shift.
  const minutesBefore_5_Converted = minutesBefore_5 / 60;
  const minutesBefore_5_rounded = parseFloat(
    minutesBefore_5_Converted.toFixed(2)
  );
  const payForMinutesBefore_5 = minutesBefore_5_rounded * regularPayRate; // This minutes get regular pay.

  console.log(
    "The hours before 5pm is:" +
      " " +
      totalHoursBefore_5 +
      `\n The hours after 5pm is: ${totalHoursAfter_5} hours and minutes after 5 is: ${endMinutesConverted} \nTotal Hours you worked today is: ${
        totalHoursAfter_5 + totalHoursBefore_5
      } hours, ${minutesBefore_5 + endMinutes} mins`
  );
  const totalCumulativePay = parseFloat(
    (
      payForHoursBefore_5 +
      payForMinutesBefore_5 +
      payForHoursAfter_5 +
      payForMinutesAfter_5
    ).toFixed(2)
  );
  console.log(
    `Your pay for hours & minutes before 5 is: $${payForHoursBefore_5},$${payForMinutesBefore_5}  \nYour pay for hours & minutes after 5 is:$${payForHoursAfter_5}, $${payForMinutesAfter_5} \nYour total pay is $${totalCumulativePay}.`
  );
  displayResultAfter_5PM(
    endMinutes,
    payForHoursBefore_5,
    payForMinutesBefore_5,
    payForHoursAfter_5,
    payForMinutesAfter_5,
    totalHoursBefore_5,
    minutesBefore_5,
    totalHoursAfter_5,
    totalCumulativePay,
    regularPayRate,
    extraPay,
    shiftType,
    startHour,
    startMinutes,
    endHour
  );
  console.log(
    endMinutes,
    payForHoursBefore_5,
    payForMinutesBefore_5,
    payForHoursAfter_5,
    payForMinutesAfter_5,
    totalHoursBefore_5,
    minutesBefore_5,
    totalHoursAfter_5,
    totalCumulativePay,
    regularPayRate,
    extraPay,
    shiftType
  );
  //   console.log(totalHoursBefore_8);
  //   console.log(newPayRate);
  //   console.log(totalMinutesBefore_8);
  //   console.log(
  //     "Total hours before 8: " + totalHoursBefore_8 + ":" + totalMinutesBefore_8
  //   );
  //   const payForHoursBefore_8 = totalHoursBefore_8 * newPayRate;
  //   const totalMinutesConvertedToDecimalNumbers = totalMinutesBefore_8 / 60;

  //   const payForMinutesBefore_8 =
  //     parseFloat(totalMinutesConvertedToDecimalNumbers.toFixed(2)) * newPayRate; // round decimals to two places.
  //   const totalPayBefore_8 = payForHoursBefore_8 + payForMinutesBefore_8;
  //   console.log(totalPayBefore_8);
  //   const hoursAfter_8 = endHour - startHour - totalHoursBefore_8;
  //   const minutesAfter_8 = endMinutes / 60;
  //   const convertedMinutesAfter_8 = parseFloat(minutesAfter_8.toFixed(2));
  //   const totalPayAfter_8 =
  //     hoursAfter_8 * regularPayRate + convertedMinutesAfter_8 * regularPayRate;
  //   const totalCumulativePay = totalPayBefore_8 + totalPayAfter_8;
  //   console.log(`Your total pay before taxes is: $${totalCumulativePay}`);
  //   console.log(
  //     `Your total pay if you worked before 8 am is: ${totalCumulativePay}. \nThe breakdown is as this - Pay before 8: ${totalPayBefore_8}, Pay after 8: ${totalPayAfter_8}, minutes after 8 is: ${minutesAfter_8}, minutes before 8 is: ${totalMinutesConvertedToDecimalNumbers}, hours before 8 is ${totalHoursBefore_8}\n Pay for the hours before 8 is ${payForHoursBefore_8} and minutes before 8 is ${payForMinutesBefore_8}\n Pay for hours after 8 is ${
  //       hoursAfter_8 * regularPayRate
  //     } and minutes after 8 is ${
  //       convertedMinutesAfter_8 * regularPayRate
  //     } \n minutes after 8 is: ${convertedMinutesAfter_8} hours after 8 is ${hoursAfter_8} `
  //   );
  //   document.querySelector(".result__div").innerHTML = "";
  //   document
  //     .querySelector(".result__div")
  //     .insertAdjacentHTML(
  //       "beforeend",
  //       `<h3 class="result__text">Your Total Pay (before taxes) is: $${totalCumulativePay}</h3`
  //     );
}

// BREAKDOWN DISPLAY FUNCTION FOR SHIFTS BEFORE '8AM'
function displayResultBefore_8AM(
  endMinutes,
  payForHoursBefore_8,
  payForMinutesBefore_8,
  payForHoursAfter_8,
  payForMinutesAfter_8,
  totalHoursBefore_8,
  totalMinutesBefore_8,
  hoursAfter_8,
  totalPay,
  regularPayRate,
  extraPay,
  shiftType,
  startHour,
  startMinutes,
  endHour
) {
  shiftTimingsDiv.insertAdjacentHTML(
    "afterend",
    `<div class="another__calc--div"><button class="another__calc">Do Another Calculation</button></div>`
  );
  shiftTimingsDiv.remove();
  document.querySelector(".div__submit").remove();
  //   shiftTimingsDiv.remove();
  //document.querySelector(".text__div").insertAdjacentHTML("afterend", `<div class="another__calc--div"><button class="another__calc">Do Another Calculation</button></div>`);
  resultDiv.classList.add("result__div");
  displayHTML.innerHTML = "";
  displayHTML.insertAdjacentHTML(
    "beforeend",
    `<h3 class="result__text">Your Total Pay (before taxes) is: $${totalPay}.</h3>`
  );
  displayHTML.insertAdjacentHTML(
    "beforeend",
    `<h3 class="calc__breakdown--qtn" style="color:black">Would you like a breakdown of this calculation?<button class="Yes">YES</button><button class="No">NO</button></h3>`
  );
  document.querySelector(".result__text").style.textAlign = "center";
  document.querySelector(".calc__breakdown--qtn").style.textAlign = "center";
  const doAnotherCalcBtn = document.querySelector(".another__calc");
  doAnotherCalcBtn.addEventListener("click", function (e) {
    location.reload();
  });
  yesBtn = document.querySelector(".Yes");
  noBtn = document.querySelector(".No");
  noBtn.addEventListener("click", function () {
    console.log("No button is clicked");
    displayHTML.innerHTML = "";
    displayHTML.insertAdjacentHTML(
      "beforeend",
      `<h3 class="result__text">💰 Your Total Pay (before taxes) is: $${totalPay}.</h3>`
    );
    // document.querySelector(".calc__breakdown--qtn").remove();
    document.querySelector(".result__text").style.textAlign = "center";
  });

  yesBtn.addEventListener("click", function () {
    const payBefore_8 = parseFloat(
      (payForHoursBefore_8 + payForMinutesBefore_8).toFixed(2)
    );
    const payAfter_8 = parseFloat(
      (payForHoursAfter_8 + payForMinutesAfter_8).toFixed(2)
    );
    console.log("Yes button is clicked");
    document.querySelector(".result__text").style.textAlign = "";
    document.querySelector(".calc__breakdown--qtn").remove();
    displayHTML.insertAdjacentHTML(
      "beforeend",
      `
           <h3 class="calc__breakdown--qtn" style="color:black"> Your shift today is:  <span class="breakdown" style="color:rgb(140, 1, 140)">${
             shiftType === "FPTA"
               ? "Foot Passenger Ticket Agent (FPTA) 🚶🏻‍♂️🚶🏻‍♀️"
               : " Vehicle Booth (VB) 🚙 🚚"
           } </span>between ${String(startHour).padStart(
        2,
        0
      )}:${startMinutes} ${
        startHour < 12 ? "AM" : "PM"
      } - ${endHour}:${endMinutes} ${endHour >= 12 ? "PM" : "AM"}. </h3>
           


          <h3 class="calc__breakdown--qtn" style="color:black"> 💵 Your pay rate for this shift is: <span class="breakdown"> $${String(
            regularPayRate
          ).padEnd(5, 0)}.</span></h3>
           
          <h3 class="calc__breakdown--qtn" style="color:black"> Hours you worked for this shift before 8AM:<span class="breakdown"> ${totalHoursBefore_8}hours, ${totalMinutesBefore_8} mins.</span>
          Hours you worked for this shift after 8AM: <span class="breakdown">${hoursAfter_8} hours, ${endMinutes} mins.</span> </h3>
          
          <h3 class="calc__breakdown--qtn" style="color:black">You have worked today for a total of <span class="breakdown"> ${
            totalHoursBefore_8 + hoursAfter_8 + 1
          } hours, ${
        totalMinutesBefore_8 + Number(endMinutes) - 60
      } mins. </span></h3>


          <h3 class="calc__breakdown--qtn" style="color:black">🤑 Extra pay (at the rate of +15% of your regular payrate) for ${totalHoursBefore_8} hours, ${totalMinutesBefore_8} mins is: <span class="breakdown"> $${extraPay.toFixed(
        2
      )}.</span></h3>
  
        <h3 class="calc__breakdown--qtn" style="color:black">Pay for ${totalHoursBefore_8}hours, ${totalMinutesBefore_8} mins 'before 8AM' is: <span class="breakdown"> $${payBefore_8}.</span></h3>

          <h3 class="calc__breakdown--qtn" style="color:black"> Pay for ${hoursAfter_8} hours, ${endMinutes} mins 'after 8AM' is: <span class="breakdown"> $${payAfter_8}.</span></h3>
           
  
  
       <h3 class="calc__breakdown--qtn" style="color:black">💰 Your total Income for this shift is:  <span class="breakdown">$${String(
         totalPay
       ).padEnd(5, 0)}</span> (before taxes) </h3>

          
          
         
          
          `
    );
  });
}

// BREAKDOWN DISPLAY FUNCTION FOR SHIFTS AFTER '5PM'
function displayResultAfter_5PM(
  endMinutes,
  payForHoursBefore_5,
  payForMinutesBefore_5,
  payForHoursAfter_5,
  payForMinutesAfter_5,
  totalHoursBefore_5,
  minutesBefore_5,
  totalHoursAfter_5,
  totalPay,
  regularPayRate,
  extraPay,
  shiftType,
  startHour,
  startMinutes,
  endHour
) {
  shiftTimingsDiv.insertAdjacentHTML(
    "afterend",
    `<div class="another__calc--div"><button class="another__calc">Do Another Calculation</button></div>`
  );
  shiftTimingsDiv.remove();
  document.querySelector(".div__submit").remove();
  //   shiftTimingsDiv.remove();
  //document.querySelector(".text__div").insertAdjacentHTML("afterend", `<div class="another__calc--div"><button class="another__calc">Do Another Calculation</button></div>`);
  resultDiv.classList.add("result__div");
  displayHTML.innerHTML = "";
  displayHTML.insertAdjacentHTML(
    "beforeend",
    `<h3 class="result__text">Your Total Pay (before taxes) is: $${totalPay}.</h3`
  );
  displayHTML.insertAdjacentHTML(
    "beforeend",
    `<h3 class="calc__breakdown--qtn" style="color:black">Would you like a breakdown of this calculation?<button class="Yes">YES</button><button class="No">NO</button></h3>`
  );
  const doAnotherCalcBtn = document.querySelector(".another__calc");
  doAnotherCalcBtn.addEventListener("click", function (e) {
    location.reload();
  });
  yesBtn = document.querySelector(".Yes");
  noBtn = document.querySelector(".No");
  noBtn.addEventListener("click", function () {
    console.log("No button is clicked");
    displayHTML.innerHTML = "";
    displayHTML.insertAdjacentHTML(
      "beforeend",
      `<h3 class="result__text">💰 Your Total Pay (before taxes) is: $${totalPay}.</h3>`
    );
    // document.querySelector(".calc__breakdown--qtn").remove();
    document.querySelector(".result__text").style.textAlign = "center";
  });
  yesBtn.addEventListener("click", function () {
    const payBefore_5 = parseFloat(
      (payForHoursBefore_5 + payForMinutesBefore_5).toFixed(2)
    );
    const payAfter_5 = parseFloat(
      (payForHoursAfter_5 + payForMinutesAfter_5).toFixed(2)
    );
    console.log("Yes button is clicked");
    document.querySelector(".calc__breakdown--qtn").remove();
    displayHTML.insertAdjacentHTML(
      "beforeend",
      `
      <h3 class="calc__breakdown--qtn" style="color:black"> Your shift today is:  <span class="breakdown" style="color:rgb(140, 1, 140)">${
        shiftType === "FPTA"
          ? "Foot Passenger Ticket Agent (FPTA) 🚶🏻‍♂️🚶🏻‍♀️"
          : " Vehicle Booth (VB) 🚙 🚚"
      } </span> between ${startHour}:${startMinutes} ${
        startHour < 12 ? "AM" : "PM"
      } - ${endHour}:${endMinutes} ${endHour >= 12 ? "PM" : "AM"}.</h3>


      <h3 class="calc__breakdown--qtn" style="color:black">
          💵 Your pay rate for this shift is: <span class="breakdown"> $${String(
            regularPayRate
          ).padEnd(5, 0)}.</span></h3>
       
           
           <h3 class="calc__breakdown--qtn" style="color:black">
           Hours you worked for this shift before 5PM: <span class="breakdown"> ${totalHoursBefore_5}hours, ${minutesBefore_5} mins. </span>
           Hours you worked for this shift after 5PM: <span class="breakdown">${totalHoursAfter_5} hours, ${endMinutes} mins.</span> </h3>
           <h3 class="calc__breakdown--qtn" style="color:black">You have worked today for a total of <span class="breakdown"> ${
             totalHoursBefore_5 + totalHoursAfter_5
           } hours, ${minutesBefore_5 + Number(endMinutes)} mins. </span></h3>
          
           <h3 class="calc__breakdown--qtn" style="color:black">
          🤑 Extra pay (at the rate of +15% of your regular payrate) for ${totalHoursAfter_5} hours, ${endMinutes} mins is: <span class="breakdown"> $${extraPay.toFixed(
        2
      )}.</span> 
           </h3>
           <h3 class="calc__breakdown--qtn" style="color:black"> Pay for ${totalHoursAfter_5} hours, ${endMinutes} mins after 5PM is: <span class="breakdown"> $${String(
        payAfter_5
      ).padEnd(0, 5)}.</span> </h3>
           
      <h3 class="calc__breakdown--qtn" style="color:black">The pay for ${totalHoursBefore_5}hours, ${minutesBefore_5} mins before 5PM at the regular rate of $${String(
        regularPayRate
      ).padEnd(5, 0)} is: <span class="breakdown"> $${payBefore_5}.</span> </h3>
       
      <h3 class="calc__breakdown--qtn" style="color:black">
          💰 Your total Income for this shift is: <span class="breakdown">$${String(
            totalPay
          ).padEnd(5, 0)}</span> (before taxes)
         </h3>
      
      
     
      `
    );
  });
}

function displayResultIfNotBefore_8AndNotAfter_5(
  startHour,
  startMinutes,
  endHour,
  endMinutes,
  hoursWorked,
  minutesWorked,
  payForHours,
  payForMinutes,
  totalPay,
  regularPayRate,
  extraPay = 0,
  shiftType
) {
  document.querySelector(".div__submit").remove();
  //   shiftTimingsDiv.remove();
  //document.querySelector(".text__div").insertAdjacentHTML("afterend", `<div class="another__calc--div"><button class="another__calc">Do Another Calculation</button></div>`);
  resultDiv.classList.add("result__div");
  displayHTML.innerHTML = "";
  displayHTML.insertAdjacentHTML(
    "beforeend",
    `<h3 class="result__text">Your Total Pay (before taxes) is: $${totalPay}.<button class="another__calc">Do Another Calculation</button></h3`
  );
  displayHTML.insertAdjacentHTML(
    "beforeend",
    `<h3 class="calc__breakdown--qtn" style="color:black">Would you like a breakdown of this calculation?<button class="Yes">YES</button><button class="No">NO</button></h3>`
  );
  const doAnotherCalcBtn = document.querySelector(".another__calc");
  // WHEN DO-ANOTHER-CALCULATION BUTTON IS CLICKED
  doAnotherCalcBtn.addEventListener("click", function (e) {
    location.reload();
  });
  yesBtn = document.querySelector(".Yes");
  noBtn = document.querySelector(".No");
  noBtn.addEventListener("click", function () {
    console.log("No button is clicked");
    document.querySelector(".calc__breakdown--qtn").remove();
  });
  yesBtn.addEventListener("click", function () {
    console.log("Yes button is clicked");
    document.querySelector(".calc__breakdown--qtn").remove();
    displayHTML.insertAdjacentHTML(
      "beforeend",
      `
      <h3 class="calc__breakdown--qtn" style="color:black"> Your shift today is:  <span class="breakdown" style="color:rgb(140, 1, 140)"> ${
        shiftType === "FPTA"
          ? "Foot Passenger Ticket Agent (FPTA) 🚶🏻‍♂️🚶🏻‍♀️"
          : " Vehicle Booth (VB) 🚙 🚚"
      } </span> </h3>


      <h3 class="calc__breakdown--qtn" style="color:black">
          💵 Your pay rate for this shift is: <span class="breakdown"> $${String(
            regularPayRate
          ).padEnd(5, 0)}.</span></h3>
       
       <h3 class="calc__breakdown--qtn" style="color:black">You have worked today for a total of <span class="breakdown"> ${hoursWorked} hours, ${minutesWorked} mins. </span></h3>
      <h3 class="calc__breakdown--qtn" style="color:black">
          💰 Your total Income for this shift comes to = <span class="breakdown">$${String(
            totalPay
          ).padEnd(5, 0)}</span> (before taxes)
         </h3>`
    );
  });
}

// ANOTHER WAY I IMPLEMENTED Do-Another-Calculation
// inputShiftStart.value = "";
// inputShiftEnd.value = "";
// resultDiv.classList.remove("result__div");
// displayHTML.innerHTML = "";
// // add submit button div
// shiftTimingsDiv.insertAdjacentHTML(
//   "afterend",
//   `   <div class="div__submit">
//   <button class="submit">Submit</button>
// </div>`
// );
