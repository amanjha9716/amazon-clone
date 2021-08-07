
function getCartItem(){
    db.collection("cart").onSnapshot((snapshot) => {
        let quantity=0;
            snapshot.forEach((element) =>{
               quantity+=element.data().quantity 
            })
            setcartcounter(quantity)
        })
    };
function setcartcounter(quantity)
{
    document.querySelector(".cart-item-notify").innerText=quantity;
}
getCartItem();
