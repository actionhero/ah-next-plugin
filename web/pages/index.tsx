import Head from "next/head";

export default function page() {
  const containerStyle = {
    paddingTop: 100,
  };

  const messageStyle = {
    margin: "0 auto",
    paddingTop: 50,
    paddingBottom: 50,
    width: "100%",
    backgroundColor: "darkBlue",
    color: "lightBlue",
    fontFamily: "Arial",
    textAlign: "center" as "center",
  };

  return (
    <>
      <Head>
        <title>Hello from Actionhero and Next.js!</title>
      </Head>

      <div id="container" style={containerStyle}>
        <div style={messageStyle}>
          <h1>Hello from Actionhero and Next.js!</h1>
        </div>
      </div>
    </>
  );
}
