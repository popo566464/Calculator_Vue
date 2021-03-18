const vm = Vue.createApp({
    data(){
        return{
            equation:'0',
            isDecimalAdded: false, //Determine whether it is a decimal
            isOperatorAdded: false, //Determine wherther to click the add,substract,multiply,and divide buttons
            isStarted: false, //Determine whether to start entering numbers
        }
    },

    methods:{
        //check if the character is + / - / × / ÷
        isOperator(character){
            return ['+', '-', '×', '÷'].indexOf(character) > -1;
        },

        //when pressed Operators or Numbers
        append(character){
            //Begin 
            if(this.equation === '0' && !this.isOperator(character)){
                if(character ==='.'){
                    this.equation += '' + character; // ''+character , because of converting 'equation' to string.
                    this.isDecimalAdded = true;
                }
                else{
                    this.equation = '' + character;
                }

                this.isStarted = true;
                return;  //stop functioning
            }
            //if number
            if (!this.isOperator(character)){
                if(character === '.' &&  this.isDecimalAdded){
                    return;
                }

                if(character === '.'){
                    this.isDecimalAdded  = true;
                    this.isOperatorAdded = true;
                }else{
                    this.isOperatorAdded = false;
                }

                this.equation += '' + character;
            }
            //Add operator
            if(this.isOperator(character) && !this.isOperatorAdded){
                this.equation += '' + character;
                this.isDecimalAdded = false;
                this.isOperatorAdded = true;
            }

        },

        //when pressed '='
        calculate(){
            let result = this.equation.replace(new RegExp('×', 'g'), '*').replace(new RegExp('÷', 'g'), '/');
            this.equation = parseFloat(eval(result).toFixed(9)).toString();
            this.isOperatorAdded = false;
            this.isDecimalAdded = false;
        },

        //when pressed '+/-'
        calculateToggle(){
            if(this.isOperatorAdded || !this.isStarted){
                return;
            }

            this.equation = this.equation + '* -1'
            this.calculate();

        },

        //when pressed '%'
        calculatePercentage(){
            if(this.isOperatorAdded || !this.isStarted){
                return;
            }
            this.equation = this.equation + '* 0.01';
            this.calculate();

        },

        //when pressed 'AC'
        clear(){
            this.equation = '0';
            this.isDecimalAdded =  false;
            this.isOperatorAdded =  false;
            this.isStarted =  false;
        }
        
    }

}).mount("#app");