<?xml version="1.0" encoding="UTF-8" ?>
<!--Hayley Dodkins u21528790-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
    <xsl:import href="style.xsl"/>
    <xsl:output method="xml" indent="yes"/>


    <xsl:template match="/">
        <fo:root>
            <fo:layout-master-set>
                <fo:simple-page-master master-name="myPage" width="60mm" height="65mm">
                    <fo:region-body margin="5mm" margin-bottom="25mm" extent="35mm" />
                    <fo:region-before extent="20mm" />
                    <fo:region-after extent="10mm" />
                </fo:simple-page-master>
            </fo:layout-master-set>

            <fo:page-sequence master-reference="myPage">

                <fo:static-content flow-name="xsl-region-before">
                    <fo:block font-size="24pt" font-weight="bold" text-align="center" background-color="#49D0B0" color="white">My Minidex</fo:block>
                </fo:static-content>

                <fo:static-content flow-name="xsl-region-after">
                    <fo:block font-size="24pt" font-weight="bold" text-align="center" background-color="#49D0B0" color="white"><fo:page-number/></fo:block>
                </fo:static-content>
                <fo:flow flow-name="xsl-region-body">
                    <xsl:apply-templates select="pokedex/pokemon"/>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>

</xsl:stylesheet>