function getGreetingPrefix(){
const h = new Date().getHours();
return h < 12 ? "Good Morning"
: h < 17 ? "Good Afternoon"
: "Good Evening";
}
