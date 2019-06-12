<?php
	$doc=new DOMDocument("1.0","utf-8");  #声明文档类型  
	$doc->formatOutput=true;               #设置可以输出操作 
  	
	$dir = str_replace('\\', '/',dirname(__FILE__));
    $currentyear = date("Y");
    $file = $dir."/".$currentyear.'.xml'; 


    if(file_exists($file)){
    	$doc=new DOMDocument();//实例化对像
    	$doc->formatOutput = true; 
        $doc->load($currentyear.'.xml');//载入文件
    	$root =  $doc->documentElement;
    	$student = $doc->createElement("student");

		$national = array("汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
	            "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
	            "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
	            "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
	        );

	    $type = array("农村应届","农村往届","城市应届","城市往届");

		$examcode = $_POST["examcode"];
	    $username = $_POST["username"];
	    $sex = $_POST["sex"];
	    $birth = $_POST["birth"];
	    $national = $_POST["national"];
	    $type = $_POST["type"];
	    $postcode = $_POST["postcode"];
	    $mobile = $_POST["mobile"];
	    $address = $_POST["address"];
	    $moblieaddress = $_POST["moblieaddress"];
	    $sendaddress = $_POST["sendaddress"];

	    $examcode=$doc->createElement("examcode",$examcode);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $username=$doc->createElement("username",$username);//创建元素ball1 并赋值$arr['resultBall1']内容
	    $sex=$doc->createElement("sex",$sex);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $birth=$doc->createElement("birth",$birth);
	    $national=$doc->createElement("national",$national);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $type=$doc->createElement("type",$type);
	    $postcode=$doc->createElement("postcode",$postcode);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $mobile=$doc->createElement("mobile",$mobile);
	    $address=$doc->createElement("address",$address);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $moblieaddress=$doc->createElement("moblieaddress",$moblieaddress);
	    $sendaddress=$doc->createElement("sendaddress",$sendaddress);
	    $student->appendChild($examcode);
	    $student->appendChild($username);
	    $student->appendChild($sex);
	    $student->appendChild($birth);
	    $student->appendChild($national);
	    $student->appendChild($type);
	    $student->appendChild($postcode);
	    $student->appendChild($mobile);
	    $student->appendChild($address);
	    $student->appendChild($moblieaddress);
	    $student->appendChild($sendaddress);

	    $root->appendChild($student);
	    $doc->save($currentyear.".xml");
    }
    else{
		#声明根节点，最好一个XML文件有个跟节点  
		$root=$doc->createElement("root");    #创建节点对象实体  
		// $root=$doc->appendChild($root);   
		$student = $doc->createElement("student");

		$national = array("汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
	            "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
	            "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
	            "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
	        );

	    $type = array("农村应届","农村往届","城市应届","城市往届");

		$examcode = $_POST["examcode"];
	    $username = $_POST["username"];
	    $sex = $_POST["sex"];
	    $birth = $_POST["birth"];
	    $national = $_POST["national"];
	    $type = $_POST["type"];
	    $postcode = $_POST["postcode"];
	    $mobile = $_POST["mobile"];
	    $address = $_POST["address"];
	    $moblieaddress = $_POST["moblieaddress"];
	    $sendaddress = $_POST["sendaddress"];

	    $examcode=$doc->createElement("examcode",$examcode);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $username=$doc->createElement("username",$username);//创建元素ball1 并赋值$arr['resultBall1']内容
	    $sex=$doc->createElement("sex",$sex);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $birth=$doc->createElement("birth",$birth);
	    $national=$doc->createElement("national",$national);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $type=$doc->createElement("type",$type);
	    $postcode=$doc->createElement("postcode",$postcode);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $mobile=$doc->createElement("mobile",$mobile);
	    $address=$doc->createElement("address",$address);//创建元素dateNumber 并赋值$arr['resultDate']内容
	    $moblieaddress=$doc->createElement("moblieaddress",$moblieaddress);
	    $sendaddress=$doc->createElement("sendaddress",$sendaddress);
	    $student->appendChild($examcode);
	    $student->appendChild($username);
	    $student->appendChild($sex);
	    $student->appendChild($birth);
	    $student->appendChild($national);
	    $student->appendChild($type);
	    $student->appendChild($postcode);
	    $student->appendChild($mobile);
	    $student->appendChild($address);
	    $student->appendChild($moblieaddress);
	    $student->appendChild($sendaddress);
	    $root->appendChild($student);
	    $doc->appendChild($root);//结束建立根元索
		   #把节点添加进来    
	  	$doc->save($currentyear.".xml"); #保存路径  
  	}
?>