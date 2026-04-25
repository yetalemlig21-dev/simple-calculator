 const display = document.getElementById("display");
        const num = document.querySelectorAll(".number");
        const clear = document.getElementById("clear");
        const del = document.getElementById("del");
        const opraror = document.querySelectorAll(".opp");
        const equal = document.getElementById("equal");
        const sintific = document.querySelectorAll(".sintific");
        let error = false;
    num.forEach(element => {
    element.addEventListener("click" , ()=>{
        if(error){
            display.value = "";
            error = false;
        }
     display.value += element.textContent;
    });
    
   });
   clear.addEventListener("click" , ()=>{
 display.value = "";
   });
   del.addEventListener("click" , ()=>{
    display.value =  display.value.slice(0 , -1);
   });
   
  opraror.forEach(ops =>{
    ops.addEventListener("click" , ()=>{
        if(error){
            display.value= "";
            error = false;
        }
     else{
        
        if(display.value.length > 0){
            let lastvalue = display.value[display.value.length-1]
            if(["+","/", "*", "-"].includes(lastvalue)){
            display.value = display.value.slice(0 ,-1) + ops.textContent;
        }
        else{
        display.value += ops.textContent;
        }
    }
}
    })
  })

  equal.addEventListener("click" ,()=>{
    try{
  
         display.value = eval(display.value);
    }
    catch{
        display.value = "Error";
        error = true;
    }

  });
 sintific.forEach(sint => {
    sint.addEventListener("click", () => {
        const value = sint.dataset.value;
        const currentValue = parseFloat(display.value);
        
        // Validate input
        if (display.value === "" || display.value === "Error" || isNaN(currentValue)) {
            display.value = "Error";
            error = true;
            return;
        }
        
        try {
            switch(value) {
                case "sqrt":
                    if (currentValue < 0) throw new Error("Invalid input");
                    display.value = Math.sqrt(currentValue);
                    break;
                case "log":
                case "log10":
                    if (currentValue <= 0) throw new Error("Invalid input");
                    display.value = Math.log10(currentValue);
                    break;
                case "log2":
                    if (currentValue <= 0) throw new Error("Invalid input");
                    display.value = Math.log2(currentValue);
                    break;
                case "^":
                    display.value = Math.pow(currentValue, 2);
                    break;
                case "sin":
                    display.value = Math.sin(currentValue);
                    break;
                case "cos":
                    display.value = Math.cos(currentValue);
                    break;
                case "tan":
                    display.value = Math.tan(currentValue);
                    break;
                case "abs":
                    display.value = Math.abs(currentValue);
                    break;
                case "floor":
                    display.value = Math.floor(currentValue);
                    break;
                case "power":
                    const power = Number(prompt("Enter power:"));
                    if (isNaN(power)) {
                        display.value = "Error";
                        error = true;
                        return;
                    }
                    display.value = Math.pow(currentValue, power);
                    break;
                default:
                    display.value = "Error";
            }
            error = false;
        } catch(e) {
            display.value = "Error";
            error = true;
        }
    });
});

  document.addEventListener("keydown", (e) => {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.'];
        if (validKeys.includes(e.key)) {
            if (error) {
                display.value = "";
                error = false;
            }
            display.value += e.key;
        }
    if (e.key === "Enter"||"=") {
        e.preventDefault();
        try {
            display.value = eval(display.value);
            error = false;
        } catch {
            display.value = "Error";
            error = true;
        }
    }
    if (e.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    // 4. "Escape" ሲነካ ሁሉንም ለማጥፋት (AC)
    if (e.key === "Escape") {
        display.value = "";
    }
});