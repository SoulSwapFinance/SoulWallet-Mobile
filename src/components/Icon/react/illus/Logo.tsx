import Svg, { Circle, SvgProps, Path } from 'react-native-svg';
const SvgLogo = (props: SvgProps) => (
  <Svg
    id="Layer_1" x="0px" y="0px"
    viewBox="0 0 1091 1091"
	  fill={"#9854FF"}
    accessibilityRole="image"
    height={72}
    width={72}
    style={{
      // border: "1px solid black"
      display: 'flex',
      // padding: 12,
      // borderWidth: 6,
      flexWrap: "wrap",
      // borderColor: "#6A00FF",
      borderRadius: 32,
      marginTop: 0,
      marginBottom: 8,
      // shadowRadius: 24,
    }}
    // {...props}
  >
    <Circle 
		cx="600" cy="600" r="600" opacity={"0.0"}
	>
      <Path opacity="1.000000" stroke="none"
        d="
M699.000000,1061.000000 
	C466.027344,1061.000000 233.554688,1061.000000 1.041013,1061.000000 
	C1.041013,707.735535 1.041013,354.471130 1.041013,1.103341 
	C354.222870,1.103341 707.445801,1.103341 1060.834351,1.103341 
	C1060.834351,354.333282 1060.834351,707.666626 1060.834351,1061.000000 
	C940.470703,1061.000000 819.985352,1061.000000 699.000000,1061.000000 
M717.322876,881.836792 
	C732.581421,870.019409 747.834473,858.195007 763.099487,846.386047 
	C797.375061,819.870728 831.382324,793.061584 862.162109,762.398682 
	C889.612549,735.052490 913.340942,705.361511 927.723694,668.732422 
	C937.322937,644.285828 943.092041,619.361450 942.396606,593.140991 
	C942.126221,582.946899 940.488159,572.789124 939.351074,561.390930 
	C937.345825,563.059998 935.874756,563.807373 935.110474,565.005554 
	C932.274841,569.451599 929.795044,574.124634 926.958984,578.570374 
	C917.730652,593.036682 906.586670,605.633118 891.201050,613.831055 
	C878.265747,620.723511 864.781677,625.703308 849.772766,625.471802 
	C845.391052,625.404175 843.710754,623.844116 844.319092,619.539795 
	C844.924683,615.255249 845.656799,610.955872 845.805725,606.644836 
	C846.772766,578.648865 840.733459,552.397888 826.468994,528.075317 
	C811.795654,503.055603 792.749573,481.690430 772.116394,461.575714 
	C756.966858,446.807007 741.352600,432.341736 735.874573,410.683441 
	C733.207397,400.138489 729.195923,389.700562 728.266418,378.999359 
	C726.525208,358.953339 726.865295,338.736176 725.808655,318.618073 
	C724.912476,301.553741 724.351501,284.352173 721.612915,267.541901 
	C719.405701,253.993118 715.391663,240.417099 710.009888,227.776810 
	C700.059998,204.407288 682.833191,186.426010 663.569397,170.183197 
	C648.268127,157.281464 630.635071,148.276260 613.430542,138.503998 
	C612.023804,137.704971 610.295715,137.471878 608.274841,136.836914 
	C608.274841,138.373428 608.063538,139.111450 608.305664,139.642929 
	C614.929138,154.183075 619.918701,169.165741 623.834534,184.743896 
	C626.868469,196.813782 627.545898,208.986679 628.552612,221.053818 
	C629.576355,233.324860 627.889404,245.878601 626.776611,258.253448 
	C625.888550,268.129700 624.457703,277.995728 622.589050,287.736084 
	C619.941040,301.539215 616.644043,315.217224 613.674927,328.959656 
	C612.313232,335.262085 610.996948,341.576324 609.792664,347.910370 
	C607.854675,358.103638 604.921692,368.265381 604.434570,378.536469 
	C603.839539,391.083374 605.053711,403.750702 605.997925,416.327454 
	C607.225098,432.672272 614.008667,447.275299 621.907043,461.241821 
	C633.662048,482.028015 649.795959,499.602600 665.042419,517.774963 
	C675.898071,530.713928 685.919617,544.068542 691.140686,560.385437 
	C698.624817,583.774536 700.172058,607.615906 696.356934,631.846558 
	C693.474854,650.151062 685.497742,666.226562 673.946350,680.382751 
	C656.510498,701.750244 633.620667,714.681274 607.020020,721.144592 
	C585.333374,726.413879 563.497925,726.701233 541.874023,721.023438 
	C518.308960,714.836121 498.437195,702.090454 481.669769,684.622192 
	C460.980103,663.067627 449.434692,637.127808 445.942932,607.527649 
	C445.865417,606.870605 445.901642,606.062439 445.534912,605.605652 
	C444.757996,604.638000 443.853394,603.626648 442.772919,603.138306 
	C442.450073,602.992432 441.066711,604.395081 440.681763,605.304993 
	C435.105103,618.487061 428.505005,631.377014 424.461884,645.021973 
	C421.305328,655.674866 420.857880,667.242004 420.073730,678.463501 
	C418.346832,703.177002 424.440552,726.403198 434.956604,748.564331 
	C448.063110,776.184631 465.940521,800.690613 485.543579,823.917053 
	C505.727112,847.831299 526.700806,871.077393 546.980164,894.912476 
	C565.165039,916.285706 582.085022,938.648254 595.764038,963.242126 
	C599.770813,970.445801 602.719482,978.233154 606.302490,985.681152 
	C607.040344,987.214905 608.443909,988.428528 609.540649,989.789734 
	C610.736084,988.781067 612.221375,987.970764 613.072632,986.726562 
	C615.667419,982.934143 617.629333,978.653381 620.534302,975.138489 
	C630.389282,963.214417 640.103943,951.125183 650.678772,939.855835 
	C670.749084,918.467529 693.684937,900.251648 717.322876,881.836792 
M315.077209,400.539093 
	C310.330688,409.200958 305.368500,417.752747 300.880005,426.546326 
	C289.643555,448.560120 279.240326,470.949707 271.649689,494.537598 
	C270.341248,498.603607 269.252838,502.745880 267.804016,506.759521 
	C266.552460,510.226654 264.337799,511.066711 261.477814,508.235168 
	C259.145416,505.925934 256.925537,503.500183 254.545395,501.242462 
	C238.838913,486.344086 231.258591,467.371765 226.899292,446.703705 
	C225.957275,442.237366 224.277405,437.926666 222.937393,433.544281 
	C220.825256,434.967316 219.868408,436.284973 219.344406,437.756744 
	C216.864182,444.722992 214.068497,451.616882 212.187119,458.748138 
	C208.094788,474.260071 204.065445,489.812439 200.803375,505.513062 
	C197.406021,521.864807 193.575089,538.310181 192.360260,554.892456 
	C190.003220,587.065796 189.770035,619.371948 198.904190,650.823975 
	C202.994827,664.909302 206.812469,679.246521 212.733902,692.590820 
	C224.078781,718.157349 239.702072,741.219849 257.982910,762.443909 
	C289.403595,798.923340 327.121765,827.934753 367.658783,853.250671 
	C396.043549,870.977234 425.460602,887.055176 454.489136,903.743408 
	C461.653076,907.861816 469.099426,911.489075 476.415955,915.342102 
	C476.830444,914.926758 477.244965,914.511414 477.659454,914.096069 
	C476.104004,912.011658 474.732880,909.754456 472.964813,907.869446 
	C454.715546,888.415039 436.042358,869.344543 418.204071,849.522095 
	C398.897034,828.067627 379.079529,806.749023 369.764771,778.465332 
	C365.599335,765.817200 361.342224,753.123291 358.449036,740.155212 
	C355.969238,729.040100 355.423889,717.497986 353.935913,706.156128 
	C350.011993,676.245911 352.881500,646.775452 360.264984,617.731689 
	C363.385284,605.457520 366.882141,593.118713 371.843872,581.508423 
	C380.671936,560.851013 391.455627,541.076172 406.099243,523.861267 
	C416.010101,512.210144 426.783081,501.283722 437.348175,490.202545 
	C441.043030,486.327148 442.940948,486.840698 445.550323,491.631866 
	C446.100555,492.642212 446.568939,493.713776 446.938324,494.803467 
	C451.859161,509.319641 460.031982,521.960266 470.694244,532.708313 
	C494.328613,556.532837 523.217407,567.029724 556.700195,564.698059 
	C558.794250,564.552246 560.828674,563.549011 563.637939,562.725708 
	C561.655151,560.581055 560.466003,559.267029 559.247131,557.981140 
	C552.567993,550.934875 545.188843,544.420471 539.361267,536.729797 
	C530.786560,525.413757 523.733093,512.988770 521.030762,498.777374 
	C519.330078,489.833618 518.494934,480.724518 517.295593,471.686371 
	C514.951050,454.016693 517.083008,436.442139 519.276428,418.996704 
	C520.903076,406.059174 524.220032,393.326111 526.953369,380.538147 
	C529.573425,368.280518 532.313660,356.046570 535.179321,343.844055 
	C538.616638,329.206909 542.690308,314.704529 545.665833,299.977570 
	C548.880981,284.064331 551.690796,268.027191 553.701721,251.922272 
	C556.912659,226.205704 556.841614,200.491730 551.481628,174.934143 
	C546.853516,152.866348 537.053345,133.206360 523.104675,115.837204 
	C505.460876,93.866898 483.653351,76.542053 459.194580,62.587666 
	C454.153381,59.711533 448.954529,57.111763 442.957214,53.921165 
	C442.957214,56.901047 442.751923,58.554375 442.991913,60.140327 
	C444.182892,68.011467 446.110199,75.822891 446.646393,83.732071 
	C448.518799,111.351891 447.713593,138.785675 441.378693,165.986191 
	C437.054932,184.551422 430.436523,202.174225 422.797455,219.514603 
	C410.275848,247.938156 394.247711,274.409729 377.735626,300.618500 
	C356.908936,333.675720 336.146637,366.773468 315.077209,400.539093 
z"/>
    </Circle>
    <Path opacity="1.000000" stroke="none"
      d="
M717.010742,882.005310 
	C693.684937,900.251648 670.749084,918.467529 650.678772,939.855835 
	C640.103943,951.125183 630.389282,963.214417 620.534302,975.138489 
	C617.629333,978.653381 615.667419,982.934143 613.072632,986.726562 
	C612.221375,987.970764 610.736084,988.781067 609.540649,989.789734 
	C608.443909,988.428528 607.040344,987.214905 606.302490,985.681152 
	C602.719482,978.233154 599.770813,970.445801 595.764038,963.242126 
	C582.085022,938.648254 565.165039,916.285706 546.980164,894.912476 
	C526.700806,871.077393 505.727112,847.831299 485.543579,823.917053 
	C465.940521,800.690613 448.063110,776.184631 434.956604,748.564331 
	C424.440552,726.403198 418.346832,703.177002 420.073730,678.463501 
	C420.857880,667.242004 421.305328,655.674866 424.461884,645.021973 
	C428.505005,631.377014 435.105103,618.487061 440.681763,605.304993 
	C441.066711,604.395081 442.450073,602.992432 442.772919,603.138306 
	C443.853394,603.626648 444.757996,604.638000 445.534912,605.605652 
	C445.901642,606.062439 445.865417,606.870605 445.942932,607.527649 
	C449.434692,637.127808 460.980103,663.067627 481.669769,684.622192 
	C498.437195,702.090454 518.308960,714.836121 541.874023,721.023438 
	C563.497925,726.701233 585.333374,726.413879 607.020020,721.144592 
	C633.620667,714.681274 656.510498,701.750244 673.946350,680.382751 
	C685.497742,666.226562 693.474854,650.151062 696.356934,631.846558 
	C700.172058,607.615906 698.624817,583.774536 691.140686,560.385437 
	C685.919617,544.068542 675.898071,530.713928 665.042419,517.774963 
	C649.795959,499.602600 633.662048,482.028015 621.907043,461.241821 
	C614.008667,447.275299 607.225098,432.672272 605.997925,416.327454 
	C605.053711,403.750702 603.839539,391.083374 604.434570,378.536469 
	C604.921692,368.265381 607.854675,358.103638 609.792664,347.910370 
	C610.996948,341.576324 612.313232,335.262085 613.674927,328.959656 
	C616.644043,315.217224 619.941040,301.539215 622.589050,287.736084 
	C624.457703,277.995728 625.888550,268.129700 626.776611,258.253448 
	C627.889404,245.878601 629.576355,233.324860 628.552612,221.053818 
	C627.545898,208.986679 626.868469,196.813782 623.834534,184.743896 
	C619.918701,169.165741 614.929138,154.183075 608.305664,139.642929 
	C608.063538,139.111450 608.274841,138.373428 608.274841,136.836914 
	C610.295715,137.471878 612.023804,137.704971 613.430542,138.503998 
	C630.635071,148.276260 648.268127,157.281464 663.569397,170.183197 
	C682.833191,186.426010 700.059998,204.407288 710.009888,227.776810 
	C715.391663,240.417099 719.405701,253.993118 721.612915,267.541901 
	C724.351501,284.352173 724.912476,301.553741 725.808655,318.618073 
	C726.865295,338.736176 726.525208,358.953339 728.266418,378.999359 
	C729.195923,389.700562 733.207397,400.138489 735.874573,410.683441 
	C741.352600,432.341736 756.966858,446.807007 772.116394,461.575714 
	C792.749573,481.690430 811.795654,503.055603 826.468994,528.075317 
	C840.733459,552.397888 846.772766,578.648865 845.805725,606.644836 
	C845.656799,610.955872 844.924683,615.255249 844.319092,619.539795 
	C843.710754,623.844116 845.391052,625.404175 849.772766,625.471802 
	C864.781677,625.703308 878.265747,620.723511 891.201050,613.831055 
	C906.586670,605.633118 917.730652,593.036682 926.958984,578.570374 
	C929.795044,574.124634 932.274841,569.451599 935.110474,565.005554 
	C935.874756,563.807373 937.345825,563.059998 939.351074,561.390930 
	C940.488159,572.789124 942.126221,582.946899 942.396606,593.140991 
	C943.092041,619.361450 937.322937,644.285828 927.723694,668.732422 
	C913.340942,705.361511 889.612549,735.052490 862.162109,762.398682 
	C831.382324,793.061584 797.375061,819.870728 763.099487,846.386047 
	C747.834473,858.195007 732.581421,870.019409 717.010742,882.005310 
z"/>
    {/* </Circle> */}
    {/* <Circle cx="600" cy="600" r="600" opacity={"0.0"}> */}
    <Path opacity="1.000000" stroke="none"
      d="
M315.216888,400.196411 
	C336.146637,366.773468 356.908936,333.675720 377.735626,300.618500 
	C394.247711,274.409729 410.275848,247.938156 422.797455,219.514603 
	C430.436523,202.174225 437.054932,184.551422 441.378693,165.986191 
	C447.713593,138.785675 448.518799,111.351891 446.646393,83.732071 
	C446.110199,75.822891 444.182892,68.011467 442.991913,60.140327 
	C442.751923,58.554375 442.957214,56.901047 442.957214,53.921165 
	C448.954529,57.111763 454.153381,59.711533 459.194580,62.587666 
	C483.653351,76.542053 505.460876,93.866898 523.104675,115.837204 
	C537.053345,133.206360 546.853516,152.866348 551.481628,174.934143 
	C556.841614,200.491730 556.912659,226.205704 553.701721,251.922272 
	C551.690796,268.027191 548.880981,284.064331 545.665833,299.977570 
	C542.690308,314.704529 538.616638,329.206909 535.179321,343.844055 
	C532.313660,356.046570 529.573425,368.280518 526.953369,380.538147 
	C524.220032,393.326111 520.903076,406.059174 519.276428,418.996704 
	C517.083008,436.442139 514.951050,454.016693 517.295593,471.686371 
	C518.494934,480.724518 519.330078,489.833618 521.030762,498.777374 
	C523.733093,512.988770 530.786560,525.413757 539.361267,536.729797 
	C545.188843,544.420471 552.567993,550.934875 559.247131,557.981140 
	C560.466003,559.267029 561.655151,560.581055 563.637939,562.725708 
	C560.828674,563.549011 558.794250,564.552246 556.700195,564.698059 
	C523.217407,567.029724 494.328613,556.532837 470.694244,532.708313 
	C460.031982,521.960266 451.859161,509.319641 446.938324,494.803467 
	C446.568939,493.713776 446.100555,492.642212 445.550323,491.631866 
	C442.940948,486.840698 441.043030,486.327148 437.348175,490.202545 
	C426.783081,501.283722 416.010101,512.210144 406.099243,523.861267 
	C391.455627,541.076172 380.671936,560.851013 371.843872,581.508423 
	C366.882141,593.118713 363.385284,605.457520 360.264984,617.731689 
	C352.881500,646.775452 350.011993,676.245911 353.935913,706.156128 
	C355.423889,717.497986 355.969238,729.040100 358.449036,740.155212 
	C361.342224,753.123291 365.599335,765.817200 369.764771,778.465332 
	C379.079529,806.749023 398.897034,828.067627 418.204071,849.522095 
	C436.042358,869.344543 454.715546,888.415039 472.964813,907.869446 
	C474.732880,909.754456 476.104004,912.011658 477.659454,914.096069 
	C477.244965,914.511414 476.830444,914.926758 476.415955,915.342102 
	C469.099426,911.489075 461.653076,907.861816 454.489136,903.743408 
	C425.460602,887.055176 396.043549,870.977234 367.658783,853.250671 
	C327.121765,827.934753 289.403595,798.923340 257.982910,762.443909 
	C239.702072,741.219849 224.078781,718.157349 212.733902,692.590820 
	C206.812469,679.246521 202.994827,664.909302 198.904190,650.823975 
	C189.770035,619.371948 190.003220,587.065796 192.360260,554.892456 
	C193.575089,538.310181 197.406021,521.864807 200.803375,505.513062 
	C204.065445,489.812439 208.094788,474.260071 212.187119,458.748138 
	C214.068497,451.616882 216.864182,444.722992 219.344406,437.756744 
	C219.868408,436.284973 220.825256,434.967316 222.937393,433.544281 
	C224.277405,437.926666 225.957275,442.237366 226.899292,446.703705 
	C231.258591,467.371765 238.838913,486.344086 254.545395,501.242462 
	C256.925537,503.500183 259.145416,505.925934 261.477814,508.235168 
	C264.337799,511.066711 266.552460,510.226654 267.804016,506.759521 
	C269.252838,502.745880 270.341248,498.603607 271.649689,494.537598 
	C279.240326,470.949707 289.643555,448.560120 300.880005,426.546326 
	C305.368500,417.752747 310.330688,409.200958 315.216888,400.196411 
z"/>
  </Svg>
);
export default SvgLogo;
