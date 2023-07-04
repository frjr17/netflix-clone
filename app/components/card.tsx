import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ICardProps {
  size?: string;
  imageUrl: string;
}
export default function Card(props: ICardProps) {
  return (
    <Box
      as={motion.div}
      whileHover={{ scale: 1.2 }}
      width={{ base: "150px", md: "230px" }}
      height={{ base: "84px", md: "129px" }}
      background={`url(${props.imageUrl || "/images/movie-default.jpg"})`}
      backgroundSize={"cover"}
    ></Box>
  );
}
