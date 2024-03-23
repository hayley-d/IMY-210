<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
<!--Hayley Dodkins u21528790-->
  <xsl:template match="pokemon">
    <fo:block margin-top="5mm" page-break-after="always" text-align="center">
      <fo:external-graphic src="url('./images/normal/front/{pokedex_number}.png')" content-width="10cm" content-height="10cm" display-align="center"/>
      <fo:block font-weight="bold" color="black" font-size="40px" text-align="center">
        <xsl:text>#</xsl:text><xsl:value-of select="pokedex_number"/> - <xsl:value-of select="species"/>
      </fo:block>
      <fo:block  color="grey" font-size="40px" text-align="center">
        <xsl:for-each select="types/type">
          <xsl:value-of select="."/>
          <xsl:if test="position() != last()"> | </xsl:if>
        </xsl:for-each>
      </fo:block>
      <fo:block  color="black" font-size="40px" text-align="center">
        <xsl:text>Average Stats: </xsl:text><xsl:value-of select="format-number(sum(base_stats/*) div count(base_stats/*), '#.##')"/>
      </fo:block>
    </fo:block>
  </xsl:template>

</xsl:stylesheet>

