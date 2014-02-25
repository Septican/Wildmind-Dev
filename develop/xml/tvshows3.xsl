<?xml version='1.0'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:user="http://mycompany.com/mynamespace">
    <xsl:output method="html" />

    <xsl:template match="/">



        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="style.css"/>
                <script type="text/javascript">
                    <![CDATA[

                        console.log("loaded");

                        document.getElementsByClassName('nodeinformation').style.color='red';

                        ]]>
                </script>
            </head>
            <body>

                <xsl:for-each select="tvshow/show">
                    <a href="#{generate-id(name)}"><xsl:value-of select="name" /></a><br />
                </xsl:for-each>

                <!-- apply-templates applies a template to the element matched
                and its child nodes -->
                <xsl:apply-templates select="tvshow/show" />


                <!-- format-number(number to format, how to show number
                  # - show when nt zero and 0 - always show a number and
                  where you want commas and decimals-->
                <!-- sum() sums every element that matches -->
                <!-- div is used for division -->
                <!-- count() returns the number of elements that match -->
                <!-- More functions for rounding -->

                3.14 Rounded <xsl:value-of select="round(3.14)"/><br />

                3.14 Ceiling <xsl:value-of select="ceiling(3.14)"/><br />

                3.14 Floor <xsl:value-of select="floor(3.14)"/><br />

                Is I in Team: <xsl:value-of select="contains('Team', 'I')" /><br />

            </body>
        </html>
    </xsl:template>

    <xsl:template match="show">
        <!-- Get position versus other nodes -->


        <div style="width:100%; float:none; display:table; border:1px solid red;">
            <h3><a name="{generate-id(name)}"><xsl:value-of select="name" /></a></h3>

            <div class="imgbox">
                <img>
                    <xsl:attribute name="src">
                        <xsl:value-of select="poster/@href" />
                    </xsl:attribute>
                </img>
            </div>

            <div style="font-size:14pt; color:#000;" class="basicinfo">
                <xsl:value-of select="translate(name,
	            'abcdefghijklmnopqrstuvwxyz',
	            'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/> was released in <xsl:value-of select="release" />
            </div>

            <div>
                The Star <xsl:value-of select="actors/actor/character"/> was played by
                <xsl:value-of select="actors/actor/character/@profession"/>
                <xsl:text> </xsl:text><xsl:value-of select="actors/actor/real_name"/>
            </div>

            <div>
                <br /><b>Release:</b> <xsl:value-of select="release"/>
                <br /><b>Cancelled:</b> <xsl:value-of select="end_date"/>
                <br /><b>Description:</b> <xsl:value-of select="description"/>
                <br /><b>Average Viewers:</b> <xsl:value-of select="viewers"/>
                <!-- You can use xsl:text to insert text. It can also be used to
                make spaces between tags which wouldn't be printed otherwise -->
                <xsl:text> </xsl:text><xsl:value-of select="viewers/@units"/>

                <br /><b>Network:</b> <xsl:value-of select="network"/>,<xsl:text> </xsl:text><xsl:value-of select="network/@country" />


                <h4>Stars:</h4>
                <ul>
                    <xsl:for-each select="actors/actor">
                        <li><u style="text-transform: capitalize"><xsl:value-of select="character"/></u> played by <xsl:value-of select="real_name"/></li>
                    </xsl:for-each>

                </ul>
            </div>
            <div class="nodeinformation">
                Node Position: <xsl:value-of select="position()" /> out of <xsl:value-of select="last()" /> nodes
                Ratings: Averaged <xsl:value-of select="viewers"/> million viewers versus the average of the rest

                <!-- átlagot számolunk, először összeadjuk a nézők számát, majd elosztjuk (div) a tvshow-k számával(ez esetben 4), végül megadjuk, h hány tizedesjegyig jelenítse meg
                <xsl:value-of select="format-number(sum(/tvshow/show/viewers) div (4), '#')"/> million<br />  lehetne ez is alap esetben -->

                <xsl:value-of select="format-number(sum(/tvshow/show/viewers) div count(/tvshow/show), '#')"/> million<br />
            </div>

            <div>

                <!-- Extract the first name of an actor using substring-before() -->
                <!-- I could get the last name with substring-after() -->

                <xsl:for-each select="actors/actor">
                    <xsl:value-of select="substring-before(real_name, ' ')"/> and
                </xsl:for-each> are good actors.<br />

            </div>
        </div>

        <script src="script.js" type="text/javascript"></script>
        <br /><br /><br /><br />

    </xsl:template>

</xsl:stylesheet>