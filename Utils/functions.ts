export const changeDateFormat=(date:string)=>{
    let dateToChange =date
    const dateObject = new Date(dateToChange);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const shortDate = `${year}-${month}-${day}`;
    //console.log(shortDate)
    return shortDate
    }