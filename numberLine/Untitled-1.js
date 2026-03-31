  <div
        style={{
          position: 'relative',
          // top: showDiviser ? isMaximize ? "-20rem":'-9rem' :'-10rem',
          marginLeft: isTab ? "9%": isMaximize ?'10%':"",
          // marginRight: '50%',
          width: '50%',
          transform: showDiviser ? 'translateY(0)' : 'translateY(-100%)',
          opacity: showDiviser ? 1 : 0,
          transition: 'all 1s ease-in-out',
        }}
      >
        {/* <img
          src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/divisorboard.png"
          alt=""
          style={{
            position: 'absolute',
            zIndex: -3,
            top: isTab ? "-11rem":'-20rem',
            left: isTab ? "7rem":'0rem',
            width:  isTab ? "25rem":"33rem",
            // height: isTab ? "24rem":'32rem',
          }}
        /> */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginLeft: isTab ? "12rem":"8rem",
            
            width:isTab ? "60%":"60%",
           
            
            
            justifyContent: "center",
            
            overflow: "auto",
           
          }}
        >
          {getDivisor.map((item, index) => (
            <span
              key={index}
              style={{
                border: '1px solid #d1d5db',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: 'black',
                backgroundColor: 'white',
               
              }}
              className="tab-text"
            >
              
              {item}
            </span>
          ))}
        </div>
      </div>

        {show&&(
                <div
  style={{
    position: "absolute",
    background: "black",
    width: "100%",
    height: "100%",
    zIndex: "1000",
    opacity: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // display:"none"
  }}
  onClick={enableDiv}
>
  <div
    style={{
      background: "url(https://d3g74fig38xwgn.cloudfront.net/sound_wall/images/wordBg.jpg)",
      width: "80%", // add your desired size
      height: "80%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "10px",
      position: "relative",
       display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap:"10px",
    flexDirection:"row",
    flexWrap:"wrap",
      
    }}
  >
    {/* <h2  style={{
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top:"-1rem",
    background:"white",
    color:"red",
    padding:"0.5rem",
    cursor:"pointer",
    borderRadius:"30%",
    right:"0rem"
  }} className="h5-large" onClick={enableDiv}>close</h2> */}
  {/* <ShowingDecimalDivisor getDivisor={getDiviser}/> */}
  {/* <span className="h4-large" style={{position:"absolute",top:"0.5rem",color:"white"}} >Mixed Fractions</span> */}
  {/* <ShowingFractionDivisor getDivisor={getDiviser}/> */}
  </div>
</div>
        )}


              {/* <div
        style={{
          position: 'relative',
          top: showDiviser ? isMaximize ? "-20rem":'-9.5rem' : isMaximize ? "-20rem" :'-10rem',
          marginLeft: isTab ? "9%": '28%',
          // marginRight: '50%',
          width: '50%',
          transform: showDiviser ? 'translateY(0)' : 'translateY(-100%)',
          opacity: showDiviser ? 1 : 0,
          transition: 'all 1s ease-in-out',
        }}
      >
        <img
          src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/divisorboard.png"
          alt=""
          style={{
            position: 'absolute',
            zIndex: -3,
            top: isTab ? "-11rem":'-20rem',
            left: isTab ? "7rem":'0rem',
            width:  isTab ? "25rem": isMaximize ?'40rem':"33rem",
            // height: isTab ? "24rem":'32rem',
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginLeft: isTab ? "12rem":"8rem",
            // marginRight: "auto",
            width:isTab ? "60%":"60%",
            // height:isTab ? "6rem":"8rem",
            
            // marginTop:isTab ?  "-3rem": isMaximize ? "4rem" :"-4rem",
            justifyContent: "center",
            // alignItems: "center",
            overflow: "auto",
           
          }}
        >
          {gettingTotalMixed.map((item, index) => {
            let whole = "";
            let numerator = "";
            let denominator = "";

            if (item.includes(" ")) {
              const [wholePart, fractionPart] = item.split(" ");
              whole = wholePart;
              [numerator, denominator] = fractionPart.split("/");
            } else if (item.includes("/")) {
              [numerator, denominator] = item.split("/");
            } else {
              whole = item;
            }

            return (
              <span
                key={index}
                style={{
                  border: "1px solid #9ca3af",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  paddingTop: "0.25rem",
                  paddingBottom: "0.25rem",
                  borderRadius: "0.25rem",
                  // fontSize: "0.875rem",
                  color: "black",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  height: "fit-content",
                }}
                className="text_body"
              >
                {whole && <span>{whole}</span>}
                {numerator && denominator && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      lineHeight: "1.1",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem" }}>{numerator}</span>
                    <div
                      style={{
                        height: "1px",
                        width: "0.75rem",
                        backgroundColor: "black",
                        marginTop: "0.125rem",
                        marginBottom: "0.125rem",
                      }}
                    ></div>
                    <span style={{ fontSize: "0.75rem" }}>{denominator}</span>
                  </div>
                )}
              </span>
            );
          })}
        </div>
      </div> */}