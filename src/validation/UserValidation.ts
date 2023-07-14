export const isUserValid = (name: string, age: number, gender: string) => {
    
    let errorMessage: string = "";
    let isValid: boolean = true;

    if (!name || !age || !gender) {
        errorMessage = "Name, age, and gender are required fields!"
        isValid = false;
    } 
    
    if (name.length < 3 || name.length > 15) {
        errorMessage = "User name should be of min 3 and max 15 characters!"
        isValid = false;
    } 
    
    if (age < 12) {
        errorMessage = "User should be above 12 years!"
        isValid = false;
    } 
    
    if (gender !== "male" && gender !== "female") {
        errorMessage = "Type a valid gender!"
        isValid = false;
    }
    
    return {
        errorMessage,
        isValid
    };   
}