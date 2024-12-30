// get elements :
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let create=document.getElementById('create');

let mod='create';
let temp;

// function to calaculate total price according to price,taxes,ads,discount :

function calcTotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=`Total:${result}`;
        total.style.background='green';
        total.style.color='white';
    }
    else{
        total.innerHTML=`Total :${' '}`;
        total.style.background='red';
    }

}

// function to create product 
let dataProduct;
if(localStorage.product !=null){
    dataProduct=JSON.parse(localStorage.product);
}
else{
    dataProduct=[];
}
// crate array to save data of each product created:
 

create.onclick=function(){
    let newProduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // create or update ?
    if(title.value !='' && price.value!='' && category.value!=''){
    if(mod=='create'){
         // count of products
    if(newProduct.count>1){
        for(let i=0;i<newProduct.count;i++){
        // add each obj created to array:
        dataProduct.push(newProduct);

        }
    }
    else{
        dataProduct.push(newProduct);

    }
    }else{
        dataProduct[temp]= newProduct;
        mod='create';
        create.innerHTML='create';
        count.style.display='block';
    }
    clearData();
}

// save data in local storage :
localStorage.setItem('product', JSON.stringify(dataProduct) );

displayData();
console.log(dataProduct);

}


// clear data after create one prod
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

// display pruducts in table
function displayData(){
    calcTotal();
    let table='';
    // loop on product array:
    for(let i=0;i<dataProduct.length;i++){
        table+= `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>
            `
    }
 document.getElementById('tbody').innerHTML=table;

 let deleteAllBtn=document.getElementById('deleteAll');
 
 if(dataProduct.length>0){
    deleteAllBtn.innerHTML=`
     <button onclick="deleteAll()"> Delete All </button>
    `
 }else{
    deleteAllBtn.innerHTML='';
 }
}
displayData();
 
 

// delete product 
function deleteProduct(i){
    dataProduct.splice(i,1);
    localStorage.product=JSON.stringify(dataProduct);
    displayData()
}

function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    displayData();
}


// update product 
function updateData(i){
    // get ptoduct data in boxs to update :
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price;
    taxes.value=dataProduct[i].taxes;
    ads.value=dataProduct[i].ads;
    discount.value=dataProduct[i].discount;
calcTotal();
count.style.display='none';

    category.value=dataProduct[i].category;
    create.innerHTML='Update';
mod='Update';
temp=i;

}


// search 
let searchMood='title';

function searchMod(id){
let search=document.getElementById('search');

    if(id=='searchTitle'){
        searchMood='title';
        search.placeholder='search by title';
    }else{
        searchMood='category';
        search.placeholder='search by category';
    }
    
    search.focus();
    search.value='';
    displayData();
}

// search product 
function searchProduct(value){
    let table='';
    for(let i=0;i<dataProduct.length;i++){
    if(searchMood=='title'){
        for(let i=0;i<dataProduct.length;i++){
            if(dataProduct[i].title.includes(value.toLowerCase())){

                table+= `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>
                    `
            }
           }



    }
    else{                                                                                   


        for(let i=0;i<dataProduct.length;i++){
            if(dataProduct[i].category.includes(value.toLowerCase())){

                table+= `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>
                    `
            }
           }

    }
}
    document.getElementById('tbody').innerHTML=table;


}

 
