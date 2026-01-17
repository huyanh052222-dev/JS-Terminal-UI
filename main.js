function $(selector) { 
    return document.querySelector(selector); 
}
function $$(selector) { 
    return document.querySelectorAll(selector); 
}

const consoleScreen = $('.wrap-console');
const inputArea = $('.wrap-input'); 
const buttons = $$('.wrap-button button');

function log(message) {
    consoleScreen.innerHTML += `> ${message}<br>`;
    consoleScreen.scrollTop = consoleScreen.scrollHeight;
}

function clearConsole() {
    consoleScreen.innerHTML = '';
}

const inputField = $('#user-input');

const solutions = {
    0: () =>{ 
        log('Solution for Cau 1 executed.')
        let RawData = inputField.value;

        if(!RawData) {
            log('No input provided.');
            log('Please check your fill data (test case)!');
            return;
            
        }

        let myArray = RawData.split(',').map(item => item.trim());
        log(`Input Array: [${myArray.join(', ')}]`);
        log('-----------------------------');

        function consoleLog(element) {
            log(`Item: ${element}`);
        }

        forEchTest(myArray, consoleLog);
    },
// ----------------------------------------------------------------------------------------------------------------------------  
    1: () =>{ 
        log('Solution for Cau 2 executed.')
        let RawData = inputField.value;

        if(!RawData) {
            log('No input provided.');
            log('Please check your fill data (test case)!');
            return;
            
        }

        let numberArray = RawData.split(',').map(item => {
            let num = Number(item.trim());
            return isNaN(num) ? 0 : num;
        });

        if(numberArray.length < 2) {
            log('Please provide at least two numbers separated by commas.');
            return;
        }
        log(`Input Number Array: [${numberArray.join(', ')}]`);
        log('-----------------------------');

        function consoleLog(num1, num2) {
            let sum = num1 + num2;
            log(`(${num1}, ${num2}) => Sum: ${sum}`);
        }

        forEachPair(numberArray, consoleLog);
    },
// ----------------------------------------------------------------------------------------------------------------------------  
    2: () =>{
        log('Solution for Cau 3 executed: <br>>  No need input data!')
        let RawData = inputField.value;
        
        const randomPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 10) + 1;

            if (randomNumber) {
                resolve(randomNumber);
            } else {
                reject("Eror: Failed to generate a random number.");
            }
        }, 2000); 
        });

        log("Generating result (2s)...");
        
        randomPromise
            .then((result) => {
                log(`Random Number: ${result}`);
            })
            .catch((error) => {
                log(error);
        });
    },
// ----------------------------------------------------------------------------------------------------------------------------  
    3: () =>{
        log('Solution for Cau 4 executed.');
        let RawData = inputField.value;

        if(!RawData) {
            log('No input provided.');
            log('Please check your fill data (test case)!');
            return;
        }

        let numberArray = RawData.split(',').map(item => {
            let num = Number(item.trim());
            return isNaN(num) ? 0 : num;
        });

        log(`Input Array: [${numberArray.join(', ')}]`);

        const getEvenNumbers = (arr) => {
            return new Promise((resolve, reject) => {
                const evenNumbers = arr.filter(num => num % 2 === 0);

                if (evenNumbers.length > 0) {
                    resolve(evenNumbers);
                } else {
                    reject("Error: No even numbers found in the array.");
                }
            });
        };

        getEvenNumbers(numberArray)
        .then((result) => {
            log(`Result: [${result.join(', ')}]`);
        })
        .catch((error) => {
            log(`${error}`);
        });
    },
// ----------------------------------------------------------------------------------------------------------------------------  
    4: () =>{
        log('Solution for Cau 5 executed.')
        let RawData = inputField.value;

        log('No need input data!');
        fetchAPIData();

    },
// ----------------------------------------------------------------------------------------------------------------------------  
    5: () =>{
        log('Solution for Cau 6 executed.');
        log('Taking IP...');

        fetch('https://api.ipify.org?format=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Cannot access the service of IP.');
            }
            return response.json();
        })
        .then(data =>{
            log('-----------------------------');
            log(`My IP Address: ${data.ip}`);
            log('-----------------------------');
        })
        .catch(error => {
            log(`Error: ${error.message}`);
        });
    }
};

buttons.forEach((button, index) =>{
    button.addEventListener('click', () =>{
        clearConsole();
        if(solutions[index]) {
            solutions[index]();
        } else{
            log('No solution defined for this button.');
            
        }
    });
});


//Cau 1
function forEchTest(array, callback){
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

//Cau 2
function forEachPair(array, callback){
    for(let i = 0; i < array.length - 1; i++) {
        let currentElement = array[i];
        let nextElement = array[i + 1];
        callback(currentElement, nextElement);
    }
}


//cau 5
function fetchAPIData(){
    const screen = document.querySelector('.screen-cau5');
    const container = document.getElementById('countries-container');
    const closeBtn = document.getElementById('close');

    if(!screen || !container){
        log('Error!');
        return;
    }

    screen.style.display = "flex";

    closeBtn.onclick = function(){
        screen.style.display = "none";
    };

    async function loadAllCountries(){
        try{
            if(container.children.length > 1) return; 

            container.innerHTML = '<div class="message">Loading data...</div>';
            
            const response = await fetch('https://open.oapi.vn/location/countries');
            
            if(!response.ok) throw new Error('Error API connection');

            const data = await response.json();
            
            console.log("Loaded data:", data);

            let list = [];
            if(Array.isArray(data)) list = data;
            else if(data && Array.isArray(data.data)) list = data.data;
            else if(typeof data === 'object') list = Object.values(data);

            if(list.length === 0) {
                container.innerHTML = '<div class="message">No found any contry data</div>';
                return;
            }

            let htmlContent = ''; 

            list.forEach(country =>{                
                const name = country.name?.common || country.name || country.countryName || "Unknown Name";

                
                let flag = "https://via.placeholder.com/300x160?text=No+Flag";
                if (country.flags?.svg) flag = country.flags.svg;
                else if (country.flags?.png) flag = country.flags.png;
                else if (country.flag) flag = country.flag;

                htmlContent += 
                `
                    <div class="card">
                        <div class="flag-container">
                            <img src="${flag}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x160?text=Image+Error'">
                        </div>
                        <div class="card-body">
                            <h3 class="country-name">${name}</h3>
                            
                            <div class="info-row">
                                
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = htmlContent;

        }catch (error) {
            console.error(error);
            container.innerHTML = `<div class="message error">Error: ${error.message}</div>`;
        }
    }

    loadAllCountries();
}
