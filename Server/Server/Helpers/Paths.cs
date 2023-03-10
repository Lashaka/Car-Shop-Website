namespace Server.Helpers
{
    // Class to define paths that are used in many places, change here instead of each of them in case they move
    public static class Paths
    {
        public static string GetLogsFilePath()
        {
            return Path.Combine("Data", "Logs.txt");
        }

        public static string GetLocalPath()
        {
            return Path.Combine("wwwroot", "Images", "Cars");

        }
        public static string GetGlobalPath()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), GetLocalPath());
        }
    }
}
