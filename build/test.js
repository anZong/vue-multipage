const inquirer = require("inquirer");
inquirer.prompt([
  {
    type:"checkbox",
    message:"选择一至多种颜色：",
    name:"color",
    choices:[
      {
        name : "red"
      },
      new inquirer.Separator(), // 添加分隔符
      {
        name : "blue"
      },
      {
        name : "green"
      },
      {
        name : "pink",
        checked : true//默认
      },
      new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
      {
        name : "orange"
      }
    ]
  }
]).then(answer=>{
  console.log(answer);
});
