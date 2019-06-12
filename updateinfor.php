
<?php
	$doc=new DOMDocument("1.0","utf-8");  #声明文档类型  
	$doc->formatOutput=true;               #设置可以输出操作  
	$dir = str_replace('\\', '/',dirname(__FILE__));
    $currentyear = date("Y");
    $doc->load($currentyear.'.xml');
    $file = $dir."/".$currentyear.'.xml'; 

    $xml_object=NULL;
    if (file_exists($file)) 
    {
        $xml_object = simplexml_load_file($file);
    } 
    else 
    {
        exit('Failed to open test.xml.');
    }        


    $xml_json=json_encode($xml_object);
    $examcode = $_POST["examcode"];
    $index = 0;
    foreach($xml_object as $tmp){ 
    	$index = $index + 1;
		if($tmp->examcode == $examcode){
			break;
		}
	} 
	$stus = $doc->getElementsByTagName("student");
	$stu = $stus->item($index - 1);
	echo $stu; 
	$stu->->setAttribute("examcode",$_POST["examcode"]);
	$stu->setAttribute("username",$_POST["username"]);
	$stu->setAttribute("sex",$_POST["sex"]);
	$stu->setAttribute("birth",$_POST["birth"]);
	$stu->setAttribute("national",$_POST["national"]);
	$stu->setAttribute("type",$_POST["type"]);
	$stu->setAttribute("mobile",$_POST["mobile"]);
	$stu->setAttribute("address",$_POST["address"]);
	$stu->setAttribute("moblieaddress",$_POST["moblieaddress"]);
	$stu->setAttribute("sendaddress",$_POST["sendaddress"]);
	$doc->save($currentyear.'.xml');
    // var_dump($xml_object);
//     foreach($xml_object->student as $student) { 
// 　		var_dump($student);
// 	} 
?>