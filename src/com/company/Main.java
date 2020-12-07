package com.company;

public class Main {

    public static void main(String[] args) {
	//package com.company;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;

public class Main {

    public static void main(String[] args) {


        Express app = new Express();
        Database db = new Database();


        try {
            app.use(Middleware.statics(Paths.get("src/frontend").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3000);
        System.out.println("server started at port 3000");
    }
}

    }
}
