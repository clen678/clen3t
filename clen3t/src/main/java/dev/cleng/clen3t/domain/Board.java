package dev.cleng.clen3t.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Board {
    
    private int[][] grid;

    private Winner winner;

    private String model;

    // Boolean xtl;
    // Boolean xtm;
    // Boolean xtr;
    // Boolean xml;
    // Boolean xmm;
    // Boolean xmr;
    // Boolean xbl;
    // Boolean xbm;
    // Boolean xbr;

    // Boolean ctl;
    // Boolean ctm;
    // Boolean ctr;
    // Boolean cml;
    // Boolean cmm;
    // Boolean cmr;
    // Boolean cbl;
    // Boolean cbm;
    // Boolean cbr;
}
