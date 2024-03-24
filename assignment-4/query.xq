xquery version "1.0";
(:Hayley Dodkins u21528790:)
let $student := doc("query-xml-two.xml")/student
let $modules := doc("query-xml-one.xml")/modules/module

return
<list id="10987654">
{
    for $module in $student/module
    let $moduleInfo := $modules[@CODE = $module]/(@NAME,@CREDIT)
    return
    <li>{concat($module,'-',$moduleInfo[2],'(',$moduleInfo[1],')')}</li>
}
</list>