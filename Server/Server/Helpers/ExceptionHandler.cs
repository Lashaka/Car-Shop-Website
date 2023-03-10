namespace Server.Helpers
{
    public class ExceptionHandler : Exception
    {
        private string _Name;
        private string _Description;
        private string _Explanation;
        private string? _Time;

        public ExceptionHandler(string name = "", string description = "", string explanation = "")
        {
            _Name = name;
            _Description = description;
            _Explanation = explanation;

        }


        public class ImageAddingException : ExceptionHandler
        {

            public ImageAddingException(string explanation = "") : base()
            {
                DateTime Now = DateTime.Now;

                _Name = "ImageAddingException";
                _Description = "Could not add image.";
                _Explanation = explanation;
                _Time = Now.ToString();

            }
        }

        public class NotFoundInDbException : ExceptionHandler
        {

            public NotFoundInDbException(string explanation = "") : base()
            {
                DateTime Now = DateTime.Now;

                _Name = "CarGetException";
                _Description = "Failed to get car.";
                _Explanation = explanation;
                _Time = Now.ToString();

            }
        }

        public class DbActionFailedException : ExceptionHandler
        {

            public DbActionFailedException(string explanation = "") : base()
            {
                DateTime Now = DateTime.Now;

                _Name = "DbActionFailedException";
                _Description = "Failed to do a db action.";
                _Explanation = explanation;
                _Time = Now.ToString();

            }
        }

        public class ModelStateException : ExceptionHandler
        {

            public ModelStateException(string explanation = "") : base()
            {
                DateTime Now = DateTime.Now;

                _Name = "ModelStateException";
                _Description = "Modelstate is not right.";
                _Explanation = explanation;
                _Time = Now.ToString();

            }
        }

    }
}