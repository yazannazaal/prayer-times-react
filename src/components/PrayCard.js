import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PrayCard({ pray, prayTime, prayImg }) {
  return (
    <div>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia sx={{ height: 150 }} image={prayImg} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pray}
          </Typography>
          <Typography variant="h2" color="text.secondary">
            {prayTime}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
