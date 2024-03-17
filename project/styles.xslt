<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
    <!--Hayley Dodkins u21528790-->
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <fo:root>
            <fo:layout-master-set>
                <fo:simple-page-master master-name="productsPage" page-height="29.7cm" page-width="21cm">
                    <fo:region-body margin="2cm"/>
                </fo:simple-page-master>
            </fo:layout-master-set>

            <fo:page-sequence master-reference="productsPage">
                <fo:flow flow-name="xsl-region-body">
                    <fo:block font-size="14pt">
                        <!--Display store information-->
                        <xsl:apply-templates select="//store"/>
                    </fo:block>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>

    <xsl:template match="store">
        <fo:block font-weight="bold" font-size="24pt" text-align="center">
            <xsl:value-of select="information/name"/>
        </fo:block>
        <fo:block text-align="center" space-after="10mm">
            <xsl:value-of select="information/description"/>
        </fo:block>


        <xsl:apply-templates select="products/product">
            <xsl:sort select="title"/>
        </xsl:apply-templates>
    </xsl:template>

    <xsl:template  match="product">
        <fo:block>
            <fo:table>
                <fo:table-column column-width="50%"/>
                <fo:table-column column-width="50%"/>
                <fo:table-body>
                    <fo:table-row>
                        <fo:table-cell font-weight="bold">
                            <fo:block>Title:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="title"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row background-color="#f0f0f0">
                        <fo:table-cell font-weight="bold">
                            <fo:block>Author:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="author"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row>
                        <fo:table-cell font-weight="bold">
                            <fo:block>ISBN:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="isbn"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row background-color="#f0f0f0">
                        <fo:table-cell font-weight="bold">
                            <fo:block>SKU:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="sku"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row>
                        <fo:table-cell font-weight="bold">
                            <fo:block>Description:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="description"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row background-color="#f0f0f0">
                        <fo:table-cell font-weight="bold">
                            <fo:block>Price:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="price"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row>
                        <fo:table-cell font-weight="bold">
                            <fo:block>Department:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="department"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row background-color="#f0f0f0">
                        <fo:table-cell font-weight="bold">
                            <fo:block>Module:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="modules/module/@name"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row>
                        <fo:table-cell font-weight="bold">
                            <fo:block>Availability:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="availability"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row background-color="#f0f0f0">
                        <fo:table-cell font-weight="bold" >
                            <fo:block>Condition:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block><xsl:value-of select="condition"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                    <fo:table-row>
                        <fo:table-cell font-weight="bold">
                            <fo:block>Image:</fo:block>
                        </fo:table-cell>
                        <fo:table-cell>
                            <fo:block break-after="page"><fo:external-graphic src="{image}" content-width="200px" content-height="200px"/></fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                </fo:table-body>
            </fo:table>
        </fo:block>
    </xsl:template>
</xsl:stylesheet>