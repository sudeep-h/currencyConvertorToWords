 
let form=document.getElementById("form");

let convertToWordsBtn = document.getElementById("convertToWords");
let convertedAmount;

form.addEventListener('submit',async (e)=>{
    e.preventDefault();

    let amount = document.getElementById("amount").value ;
    let fromCurrency = document.getElementById("from-currency").value ;
    let toCurrency = document.getElementById("to-currency").value ; 

    if(!amount || amount<0){
        alert("Please enter the valid amount");
        return;
    }

    if(!fromCurrency || !toCurrency){
        alert('Please choose both the currencies');
        return;
    }

    const rate= await conversionRate(fromCurrency,toCurrency);
    
    if(rate){
        convertedAmount=(amount*rate).toFixed(2);
        document.getElementById("result").innerText=`Converted Amount:${convertedAmount} ${toCurrency}`;
    }else{
        alert("Unable to fetch the conversion rates");
    }
})

let conversionRate = async function(fromCurrency,toCurrency){
    try{
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data=await response.json();
        const rate = data.rates[toCurrency];
        return rate;
    }catch(err){
        console.log('Error fetching exchange rates',err);
    }
}

convertToWordsBtn.addEventListener('click', async () => {
    if (!convertedAmount) {
        alert('Please convert the amount first');
        return;
    }

    try {
        const result = await convertToWordsFn(convertedAmount);
        document.getElementById('inwords').innerText = `Amount in Words: ${result.convertedAmountInWords}`;
    } catch (error) {
        console.error("Conversion to Words Error: ", error);
        alert("An error occurred while converting to words.");
    }
});



const convertToWordsFn = async (amount) => {
    const wordsMap = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tensMap = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const scalesMap = ["", "Thousand", "Million", "Billion"];

    function numberToWords(n) {
        if (n === 0) return "Zero";
        if (n < 20) return wordsMap[n];
        if (n < 100) return `${tensMap[Math.floor(n / 10)]} ${wordsMap[n % 10]}`.trim();
        if (n < 1000) {
            return `${wordsMap[Math.floor(n / 100)]} Hundred ${numberToWords(n % 100)}`.trim();
        }
        for (let i = 0; i < scalesMap.length; i++) {
            const unit = Math.pow(1000, i + 1);
            if (n < unit) {
                return `${numberToWords(Math.floor(n / Math.pow(1000, i)))} ${scalesMap[i]} ${numberToWords(n % Math.pow(1000, i))}`.trim();
            }
        }
    }

    return { convertedAmountInWords: numberToWords(parseInt(amount)) };
};

