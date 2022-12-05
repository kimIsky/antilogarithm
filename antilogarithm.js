// 진수 계산식 객체
class jin_su{
    constructor( start_num ){
        this.start_num = start_num;
        this.re_array = [];
        this.ch_array = [];
        this.et_array = [];
        this.sst_arr  = { "0" : 0, "1" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9, "10" : "A", "11" : "B", "12" : "C", "13" : "D", "14" : "E", "15" : "F" };
        this.se_arr  = { 0 : "0", 1 : "1", 2 : "2", 3 : "3", 4 : "4", 5 : "5", 6 : "6", 7 : "7", 8 : "8", 9 : "9", "A" : "10", "B" : "11", "C" : "12", "D" : "13", "E" : "14", "F" : "15", "a" : "10", "b" : "11", "c" : "12", "d" : "13", "e" : "14", "f" : "15" };        
        this.total_box = 0;
        this.st_box = 0;
    }
//10진수를 2진수
    t2_set( in_v ){
        this.ch_array.unshift( in_v % 2 );
        if( in_v < 2 ){
            return 0;
        } else {
            in_v = Math.floor( in_v / 2 );
        }
        this.t2_set( in_v );
    }
//8이나 2진수를 10진수
    two_set( in_v ){
        let i = 0;
        while( i < in_v.length ){
            this.total_box += in_v[in_v.length-1-i] * Math.pow(this.start_num, i);
            i++;
        }
        return this.total_box;
    }
//16진수를 10진수 
    st_set( in_v ){
        let i = 0;
        while( i < in_v.length ){
            this.st_box += this.se_arr[in_v[in_v.length-1-i]] * Math.pow(16, i);
            i++;
        }
        return this.st_box;
    }
//10진수를 8이나 2진수
    tt_set( in_v ){
        this.re_array.unshift( in_v % this.start_num );
        if( in_v < this.start_num ){
            return 0;
        } else {
            in_v = Math.floor( in_v / this.start_num );
        }
        this.tt_set( in_v );
    }
//10진수를 16진수로
    ts_set( in_v ){
        this.et_array.unshift( this.sst_arr[ (in_v % this.start_num)]);
        if( in_v < this.start_num){
            return 0;
        } else {
            in_v = Math.floor( in_v / this.start_num);
        }
        this.ts_set( in_v );
    }
}

//입력칸 벗어났을 때 초기화 처리
$("#save_num1").focusin(function(){
    if($("#save_num1").val() == 0){
        $(".mg_a, .total_pop").css("display", "none");   
        $("#save_num1").val("");
        $("#select_box1").val("re_a");
        $("#two_num1, #ten_num1, #et_num1, #st_num1, #two_num3, #ten_num3, #et_num3, #st_num3").html("");
    } else {
        $(".mg_a, .total_pop").css("display", "none");   
        $("#select_box1").val("re_a");
        $("#two_num1, #ten_num1, #et_num1, #st_num1, #two_num3, #ten_num3, #et_num3, #st_num3").html("");
    }
});
$("#save_num2").focusin(function(){
    if($("#save_num2").val() == 0 ){
        $(".mg_b, .total_pop").css("display", "none");
        $("#save_num2").val("");
        $("#select_box2").val("re_b");
        $("#two_num2, #ten_num2, #et_num2, #st_num2, #two_num3, #ten_num3, #et_num3, #st_num3").html("");
    } else {
        $(".mg_b, .total_pop").css("display", "none");
        $("#select_box2").val("re_b");
        $("#two_num2, #ten_num2, #et_num2, #st_num2, #two_num3, #ten_num3, #et_num3, #st_num3").html("");
    }
});
//팝업을 닫았을 때 초기화 처리
$(".x_box").click(function(){
    $(".total_pop").css("display", "none");
});

//입력 후 select옵션 변경 시 이벤트
$(document).on("change", function(e){
    var ten_num = $("#save_num1").val();
    var tten_num = $("#save_num2").val();    
    var a_array = new jin_su( 2 );
    var b_array = new jin_su( 8 );
    var c_array = new jin_su( 16 );
    
    switch(e.target.value){
        case '10_a' :
            var check_in = /[^0-9$]/g;
            var num_test = check_in.test(ten_num);
            if( num_test ){
                $(".pop_up").html("숫자만 입력해주세요.");
                $(".total_pop").css("display", "block");
                $("#select_box1").find("option:eq(0)").prop("selected", true);
                $("#ten_num1, #two_num1, #et_num1, #st_num1, #save_num1").empty();               
            } else {             
                a_array.tt_set(ten_num);
                $("#two_num1").html(a_array.re_array);
                b_array.tt_set(ten_num);
                $("#et_num1").html(b_array.re_array);
                c_array.ts_set(ten_num);
                $("#st_num1").html(c_array.et_array);        
                $("#ten_num1").html(ten_num);
            }
            break;
        case '2_a' :
            var check_in = /[^0-1$]/g;
            var num_test = check_in.test(ten_num);
            if( num_test ){
                $(".pop_up").html("숫자 0과 1만 입력해주세요.");
                $(".total_pop").css("display", "block");
                $("#select_box1").find("option:eq(0)").prop("selected", true);
                $("#ten_num1, #two_num1, #et_num1, #st_num1, #save_num1").empty();                 
            } else {
                $("#ten_num1").html(a_array.two_set(ten_num));
                $("#two_num1").html(ten_num);
                var sum_num = a_array.total_box;
                b_array.tt_set(sum_num);
                $("#et_num1").html(b_array.re_array);
                c_array.ts_set(sum_num);
                $("#st_num1").html(c_array.et_array);
            }
            break;
        case '8_a' :
            var check_in = /[^0-7$]/g;
            var num_test = check_in.test(ten_num);
            if( num_test ){
                $(".pop_up").html("0부터 7사이의 숫자만 입력해주세요.");
                $(".total_pop").css("display", "block");
                $("#select_box1").find("option:eq(0)").prop("selected", true);
                $("#ten_num1, #two_num1, #et_num1, #st_num1, #save_num1").empty();                  
            } else {            
                $("#ten_num1").html(b_array.two_set(ten_num));
                var set_num = b_array.total_box;
                a_array.tt_set(set_num);
                $("#two_num1").html(a_array.re_array);
                $("#et_num1").html(ten_num);
                c_array.ts_set(set_num);
                $("#st_num1").html(c_array.et_array);
            }
            break;
        case '16_a' :
            var check_in = /[^0-9a-fA-F$]/g;
            var num_test = check_in.test(ten_num);
            if( num_test ){
                $(".pop_up").html("숫자 및 알파벳 A~F까지만 입력해주세요.");
                $(".total_pop").css("display", "block");
                $("#select_box1").find("option:eq(0)").prop("selected", true);
                $("#ten_num1, #two_num1, #et_num1, #st_num1, #save_num1").empty();                                                  
            } else {            
                $("#st_num1").html(ten_num);
                $("#ten_num1").html(c_array.st_set(ten_num));
                var last_num = c_array.st_box;
                c_array.t2_set(last_num);
                $("#two_num1").html(c_array.ch_array);
                b_array.tt_set(last_num);
                $("#et_num1").html(b_array.re_array);
            }
            break;
        case 're_a' :
            $("#ten_num1, #two_num1, #et_num1, #st_num1").html("");
            $("#save_num1").val("");
            break;            
        case '10_b' :
            var check_in = /[^0-9$]/g;
            var num_test = check_in.test(tten_num);
            if( num_test ){
                $(".pop_up").html("숫자만 입력해주세요.");
                $(".total_pop").css("display", "block");
                $("#select_box2").find("option:eq(0)").prop("selected", true);
                $("#ten_num2, #two_num2, #et_num2, #st_num2, #save_num2").empty();                             
            } else {            
                a_array.tt_set(tten_num);
                $("#two_num2").html(a_array.re_array);
                b_array.tt_set(tten_num);
                $("#et_num2").html(b_array.re_array);
                c_array.ts_set(tten_num);
                $("#st_num2").html(c_array.et_array);        
                $("#ten_num2").html(tten_num);
            }
            break;
        case '2_b' :
            var check_in = /[^0-1$]/g;
            var num_test = check_in.test(tten_num);
            if( num_test ){
                $(".pop_up").html("숫자 0과 1만 입력해주세요.");
                $(".total_pop").css("display", "block");
                $("#select_box2").find("option:eq(0)").prop("selected", true);
                $("#ten_num2, #two_num2, #et_num2, #st_num2, #save_num2").empty();                              
            } else {           
                $("#ten_num2").html(a_array.two_set(tten_num));
                $("#two_num2").html(tten_num);
                var st_num = a_array.total_box;
                b_array.tt_set(st_num);
                $("#et_num2").html(b_array.re_array);
                c_array.ts_set(st_num);
                $("#st_num2").html(c_array.et_array);
            }
            break;
        case '8_b' :
            var check_in = /[^0-7$]/g;
            var num_test = check_in.test(tten_num);
            if( num_test ){
                $(".pop_up").html("0부터 7사이의 숫자만 입력해주세요.");
                $(".total_pop").css("display", "block");
                $("#select_box2").find("option:eq(0)").prop("selected", true);
                $("#ten_num2, #two_num2, #et_num2, #st_num2, #save_num2").empty();                 
            } else {             
                $("#ten_num2").html(b_array.two_set(tten_num));
                var et_num = b_array.total_box;
                a_array.tt_set(et_num);
                $("#two_num2").html(a_array.re_array);
                $("#et_num2").html(tten_num);
                c_array.ts_set(et_num);
                $("#st_num2").html(c_array.et_array);
            }
            break;
        case '16_b' :
            var check_in = /[^0-9a-fA-F$]/g;
            var num_test = check_in.test(tten_num);
            if( num_test ){
                $(".pop_up").html("숫자 및 알파벳 A~F까지만 입력해주세요.");
                $(".total_pop").css("display", "block");
                $("#select_box2").find("option:eq(0)").prop("selected", true);
                $("#ten_num2, #two_num2, #et_num2, #st_num2, #save_num2").empty();                               
            } else {           
                $("#st_num2").html(tten_num);
                $("#ten_num2").html(c_array.st_set(tten_num));
                var last_num = c_array.st_box;
                c_array.t2_set(last_num);
                $("#two_num2").html(c_array.ch_array);
                b_array.tt_set(last_num);
                $("#et_num2").html(b_array.re_array);
            }            
            break;
        case 're_b' :
            $("#ten_num2, #two_num2, #et_num2, #st_num2").html("");
            $("#save_num2").val("");
            break;                        
    }
});

// A와 B의 연산 이벤트
$(document).on("click", function(e){
    var a_ten = parseInt($("#ten_num1").html());
    var b_ten = parseInt($("#ten_num2").html());
    var a_area = new jin_su( 2 );
    var b_area = new jin_su( 8 );
    var c_area = new jin_su( 16 );
    switch(e.target.id){
        case 'plus_bt' :
            var check_box = /[^0-9]/g;             
            if(check_box.test(a_ten) || check_box.test(b_ten) ){
                $(".pop_up").html("연산하려는 값을 입력해 주세요.");
                $(".total_pop").css("display", "block");
                $("#ten_num3, #two_num3, #et_num3, #st_num3").empty();                                
            } else {
                var plus_st = a_ten + b_ten;
                console.log(plus_st);
                $("#ten_num3").html(plus_st);
                a_area.tt_set(plus_st);
                $("#two_num3").html(a_area.re_array);
                b_area.tt_set(plus_st);
                $("#et_num3").html(b_area.re_array);
                c_area.ts_set(plus_st);
                $("#st_num3").html(c_area.et_array);
            }
            break;
        case 'minus_bt' :
            var check_box = /[^0-9]/g;             
            if( a_ten >= b_ten ){
            var minus_st = a_ten - b_ten;
            console.log(minus_st);
            $("#ten_num3").html(minus_st);
            a_area.tt_set(minus_st);
            $("#two_num3").html(a_area.re_array);
            b_area.tt_set(minus_st);
            $("#et_num3").html(b_area.re_array);
            c_area.ts_set(minus_st);
            $("#st_num3").html(c_area.et_array);
            } else {
                $(".pop_up").html("A의 입력칸에 큰수를 입력해주세요.");                
                $(".total_pop").css("display", "block");
                $("#ten_num3, #two_num3, #et_num3, #st_num3").empty();                  
            }
            if(check_box.test(a_ten) || check_box.test(b_ten) ){
                $(".pop_up").html("연산하려는 값을 입력해 주세요.");
                $(".total_pop").css("display", "block");
                $("#ten_num3, #two_num3, #et_num3, #st_num3").empty();                  
            }            
            break;
        case 'multi_bt' :
            var check_box = /[^0-9]/g;             
            if(check_box.test(a_ten) || check_box.test(b_ten) ){
                $(".pop_up").html("연산하려는 값을 입력해 주세요.");
                $(".total_pop").css("display", "block");
                $("#ten_num3, #two_num3, #et_num3, #st_num3").empty();                  
            } else {
                var multi_st = a_ten * b_ten;
                console.log(multi_st);
                $("#ten_num3").html(multi_st);
                a_area.tt_set(multi_st);
                $("#two_num3").html(a_area.re_array);
                b_area.tt_set(multi_st);
                $("#et_num3").html(b_area.re_array);
                c_area.ts_set(multi_st);
                $("#st_num3").html(c_area.et_array);
            }
            break;
    }
});
