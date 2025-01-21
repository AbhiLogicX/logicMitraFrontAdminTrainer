const FormatPrice=({price})=>{
    let number=
     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
       price
       )
       return(
         <>
     {number}
         </>
       )
 
 }
  export default FormatPrice;