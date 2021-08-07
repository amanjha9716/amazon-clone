function getData(){
    db.collection("items").get().then((querySnapshot) => {
        let items=[];
        querySnapshot.forEach((doc) => {
            items.push(
            {
                id:doc.id,
                name:doc.data().name,
                make:doc.data().make,
                price:doc.data().price,
                rating:doc.data().rating,
                image:doc.data().image           
            });
        });
        generatepro(items)
    });
}
// most imp part adding collection with custom id
function addToCart(ele){
    console.log(ele.name);
    cartitem=db.collection("cart").doc(ele.id);
    cartitem.get()
    .then((function(doc) {
        if(doc.exists){
            cartitem.update({
                quantity:doc.data().quantity+1
            })
            
        }
        else 
        {
            cartitem.set({
                image:ele.image,
                name:ele.name,
                quantity:1,
                make:ele.make,
                price:ele.price
                })
            
        }
        
        
    }))
    
}
function generatepro(items)
{
    inHtml='';
    items.forEach((ele)=>{
        console.log(ele);
        let doc= document.createElement("div");
        doc.classList.add("main-section-product","px-3","pb-3");
        doc.innerHTML=`
        <div class="image w-48 h-52 flex pb-4 items-center justify-center bg-white rounded-xl">
          <img class="h-48 p-2"
            src="${ele.image}";
            alt=""
          />
        </div>
        <div class="name">${ele.name}</div>
        <div class="price">Price: ${numeral(ele.price).format('00,000.00')} <sup>&#8377;</sup></div>
        <div class="rating flex justify-left items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 text-yellow-500 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path></svg
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 text-yellow-500 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path></svg
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 text-yellow-500 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path></svg
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 text-yellow-500 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 text-gray-500 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          ${ele.rating}
        </div>`
        let addtocart=document.createElement("div");
        addtocart.classList.add("add-to-cart", "hover:flex-shrink", "cursor-pointer", "text-white", "h-8" ,"w-28" ,"ml-1", "mb-3" ,"flex","items-center" ,"justify-center","rounded-md","transition" ,"duration-200", "ease-in-out", "bg-yellow-400", "hover:bg-yellow-00", "transform" ,"hover:-scale-1","hover:scale-110");
        addtocart.innerText="Add To Cart";
        addtocart.addEventListener("click",function(){
            addToCart(ele);
        });
        doc.appendChild(addtocart);        
        document.querySelector(".main-product-display").appendChild(doc);
    })
}

getData();
