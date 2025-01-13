let form=document.getElementById("form");

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
        let convertedRate=(amount*rate).toFixed(2);
        document.getElementById("result").innerText=`Converted Amount:${convertedRate} ${toCurrency}`;
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


