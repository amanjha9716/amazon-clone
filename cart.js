// function getcartitems() {
// db.collection("cart").onSnapshot((sanpshot)=>{
//     let cart=[];
//     snapshot.forEach((ele)=>{
//         let product=document.createElement("div");
//         cart.push({
//             id:ele.data().id,
//             ...ele.data()
//         })
//         console.log(cart);
//     } 

// })
// }
function getCartItems(){
    db.collection("cart").onSnapshot((snapshot) => {
            let items=[];
            snapshot.docs.forEach((doc) =>{
               items.push({
                   id:doc.id,
                   ...doc.data()
               })              
            })   
            generatecart(items);
      })
    };
    function increasecount(itemid){
        let cartitem=db.collection("cart").doc(itemid);
        cartitem.get().then(function(doc){
            if(doc.exists)
            {
                cartitem.update({
                    quantity : doc.data().quantity + 1
                })
            }
        })
    }
    function decreasecount(itemid)
    {
        let cartitem=db.collection("cart").doc(itemid);
        cartitem.get().then(function(doc){
            if(doc.exists)
            {
                if(doc.data().quantity > 1)
                {
                    cartitem.update({
                        quantity : doc.data().quantity - 1
                    })
                }
                else 
                {
                    cartitem.delete();
                }
            }
        })
    }
    function deleteItem(itemid){
        let cartitem=db.collection("cart").doc(itemid);
        cartitem.get().then(function(doc){
            if(doc.exists)
            {
                cartitem.delete();
            }
        })
    }
function generatecart(items) {
    let inHTML=``;
    
    items.forEach((ele)=>{
         inHTML+=`
         <div class="w-full flex">
            <div class="cart-item-desc rounded-lg  flex flex-grow">
                <img class="w-40 h-24 object-contain rounded-lg " src=${ele.image} alt="" srcset="">
                <div class="pro-desc  items-center">
                    <div class="items-center text-gray-700">
                    ${ele.name}
                    </div>
                    <div class="text-gray-400 text-sm">
                            Brand: ${ele.make}
                    </div>
                </div>
                
            </div>
            <div class="cart-item-no text-gray-400 flex items-center w-48  ">
                <div data-id=${ele.id} class="bg-gray-100 quant-btn quant-decr rounded-lg hover:bg-gray-200 cursor-pointer mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                </div>
                 x${ele.quantity} 
                 <div data-id=${ele.id} class="bg-gray-100 quant-btn quant-incr  rounded-lg hover:bg-gray-200 cursor-pointer ml-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                 </div>
            </div>
            <div class="cart-item-cost w-48 font-bold text-gray-400 flex items-center">
            ${numeral(ele.price*ele.quantity).format('00,000.00')} &#8377;
            </div>

            <div data-id=${ele.id} class="cart-item-delete text-gray-300 w-10 cursor-pointer flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
            </div>
        </div>
        <div class="text-gray-100 my-3">
            <hr>
        </div>`
           
    })
    
    document.querySelector(".cart-items").innerHTML=inHTML;
    eventListener(); 
     function eventListener()
     {
         let decrease=document.querySelectorAll(".quant-decr");
         let increase=document.querySelectorAll(".quant-incr");
         let deletebtn=document.querySelectorAll(".cart-item-delete");
         decrease.forEach((ele)=>{
             ele.addEventListener("click",function()
             {                    
                 decreasecount(ele.dataset.id);
                //  in naming class we need to name it as data-anything ans to acces it we need to use var.dataset.anything
            })
         })
         increase.forEach((element)=>{
            element.addEventListener("click",function(){
                increasecount(element.dataset.id);
            })
         })
        deletebtn.forEach((ele)=>{
            ele.addEventListener("click",function(){
                deleteItem(ele.dataset.id);
            })
        })
    }
}
getCartItems();

function getTotal(){
    db.collection("cart").onSnapshot((querySnapshot) => {
        let total=0;
            querySnapshot.forEach((element) =>{
               total+= element.data().quantity * element.data().price 
            })
            setcarttotal(total)
        })
    };
function setcarttotal(total)
{
    document.querySelector(".total-price span").innerText= numeral(total).format('0,00,000.00') ;
}
getTotal();