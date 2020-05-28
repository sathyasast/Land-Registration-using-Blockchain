package Testing;

import java.io.IOException;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.time.StopWatch;
import org.bouncycastle.jcajce.provider.digest.SHA3.DigestSHA3;
//import org.bouncycastle.jcajce.provider.digest.SHA3.Digest256;
import org.bouncycastle.crypto.digests.RIPEMD160Digest;
import org.bouncycastle.util.encoders.Hex;
import java.util.*;


public class Test {
 
    private static final int TIMES = 1_000_000;
    
    public static void main(String[] args) throws IOException {
    	Scanner in=new Scanner(System.in);
    	System.out.print("Input String: ");
    	String t=in.nextLine();
    	System.out.println(t);
        System.out.println();
        
        System.out.println("RIPEMD128 TestING");
        ripemd(t);
        System.out.println();
        
        System.out.println("SHA256 HASHING");
        System.out.println("Time Taken: " + sha256(t));
        System.out.println();
        
        System.out.println("SHA 512 HASHING");
        System.out.println("Time Taken: " + sha512(t));
        System.out.println();
      
        System.out.println("KECCAK HASHING");
        System.out.println("Time Taken: " + sha3(t));
        System.out.println();
        
        System.out.println("KECCAK + RIPEMD HASHING");
        System.out.println("Time Taken: " + ripemdkeccak(t));
        System.out.println();
    }
    
    public static void ripemd(String e) throws IOException {
  
    	StopWatch watch = new StopWatch();
        watch.start();
    	 byte[] r = e.getBytes("US-ASCII");
         RIPEMD160Digest d = new RIPEMD160Digest();
         for (int i = 0; i < TIMES; i++) {
             d.update (r, 0, r.length);
         }
         watch.stop();
         byte[] o = new byte[d.getDigestSize()];
         d.doFinal (o, 0);
         
         Hex.encode (o, System.out);System.out.println();
         System.out.println("Hash Length: "+d.getDigestSize()+" bytes");
      
         System.out.println("Time Taken :"+watch.getTime());
    }
    
    public static long ripemdkeccak(String e) throws IOException {
    	StopWatch watch = new StopWatch();
    	 RIPEMD160Digest d = new RIPEMD160Digest();
        watch.start();
        DigestSHA3 md = new DigestSHA3(256);
        for (int i = 0; i < TIMES; i++) {

        md.update(e.getBytes());
        byte[] digest = md.digest();
        String rhash= Hex.toHexString(digest);
        byte[] kk = rhash.getBytes("US-ASCII");
        d.update (kk, 0, kk.length);
        
        }
        watch.stop();

        byte[] o = new byte[d.getDigestSize()];
        d.doFinal (o, 0);
        Hex.encode (o, System.out);
        System.out.println();
        System.out.println("Hash Length: "+d.getDigestSize()+" bytes");


        return watch.getTime();

    }
    
    public static long sha3(String e) {
    	StopWatch watch = new StopWatch();
        watch.start();
        DigestSHA3 md = new DigestSHA3(256);
        for (int i = 0; i < TIMES; i++) {
        md.update(e.getBytes());
        }
        watch.stop();
        byte[] digest = md.digest();
        String hh = Hex.toHexString(digest);
        
        System.out.println(hh);
        System.out.println("Hash Length: "+hh.length()+" bytes");


        return watch.getTime();

    
    }
    
    public static long md5(String e) {
        StopWatch watch = new StopWatch();
        watch.start();
        for (int i = 0; i < TIMES; i++) {
            DigestUtils.md5Hex(e.getBytes());
        }
        watch.stop();
        System.out.println(DigestUtils.md5Hex(e.getBytes()));
        System.out.println("Hash Length: "+DigestUtils.md5Hex(e).length()+" bytes");

        return watch.getTime();
    }
 

    public static long sha256(String e) {
    	 StopWatch watch = new StopWatch();
         watch.start();
         for (int i = 0; i < TIMES; i++) {
             DigestUtils.sha256Hex(e.getBytes());
         }
         watch.stop();
        System.out.println(DigestUtils.sha256Hex(e.getBytes()));
        System.out.println("Hash Length: "+DigestUtils.sha256Hex(e).length()+" bytes");
        return watch.getTime();
    }

    public static long sha512(String e) {
    	StopWatch watch = new StopWatch();
        watch.start();
        for (int i = 0; i < TIMES; i++) {
            DigestUtils.sha512Hex(e.getBytes());
        }
        watch.stop();
        System.out.println(DigestUtils.sha512Hex(e.getBytes()));
        System.out.println("Hash Length: "+DigestUtils.sha512Hex(e).length()+" bytes");
        return watch.getTime();
    }

}